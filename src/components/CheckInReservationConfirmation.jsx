import { useEffect, useState } from "react";
import Spinner from "./Spinner";
import Alert from "./Alert";
import useSettingsQuery from "../hooks/useSettingsQuery";
import calculateNights from "../utils/calculateNights";
import calculateNightsText from "../utils/calculateNightsText";

export default function CheckInReservationConfirmation({
  updateReservation,
  reservation,
}) {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [breakfastIncluded, setBreakfastIncluded] = useState(false);
  const [breakfastPrice, setBreakfastPrice] = useState(0);
  const { isLoading, settings, error } = useSettingsQuery();

  useEffect(() => {
    setIsConfirmed(reservation?.is_paid ?? false);
    setBreakfastIncluded(reservation?.breakfast_included ?? false);
  }, [reservation]);

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

  const { nights, nightText } = calculateNightsText(
    reservation.check_in_date,
    reservation.check_out_date
  );

  const breakfastTotalPrice =
    settings.breakfast_price *
    calculateNights(reservation.check_in_date, reservation.check_out_date) *
    reservation.number_of_guests;
  return (
    <>
      {!reservation.breakfast_included && (
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            checked={breakfastIncluded}
            id="breakfast"
            onChange={() => {
              setBreakfastIncluded((breakfastIncluded) => !breakfastIncluded);
              setIsConfirmed(false);
              setBreakfastPrice(breakfastTotalPrice);
            }}
          />
          <label className="form-check-label" htmlFor="breakfast">
            {reservation && (
              <span>
                Add breakfast for: <strong>${breakfastTotalPrice}</strong> ( $
                {settings.breakfast_price} per breakfast &times;{" "}
                {reservation.number_of_guests}{" "}
                {reservation.number_of_guests === 1 ? "guest" : "guests"}{" "}
                &times; {nights} {nightText})
              </span>
            )}
          </label>
        </div>
      )}
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          checked={isConfirmed}
          id="payment"
          onChange={() => setIsConfirmed((isConfirmed) => !isConfirmed)}
          disabled={isConfirmed}
        />

        <label className="form-check-label" htmlFor="payment">
          {reservation && reservation.guests && (
            <span>
              I confirm that {reservation.guests.first_name}{" "}
              {reservation.guests.last_name} has paid the total amount of{" "}
              {!breakfastIncluded ? (
                <span>
                  <strong>${reservation.total_price}</strong> ({nights}{" "}
                  {nightText} &times; ${reservation.room_rate})
                </span>
              ) : (
                <>
                  <strong>
                    ${reservation.total_price + breakfastTotalPrice}
                  </strong>{" "}
                  (${reservation.total_price} room + ${breakfastTotalPrice}{" "}
                  breakfast)
                </>
              )}
            </span>
          )}
        </label>
      </div>
      <hr className="border-secondary" />
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button
          className="btn btn-success"
          onClick={() =>
            updateReservation({
              reservationId: reservation.id,
              updatedReservationData: {
                status: "checked in",
                is_paid: true,
                breakfast_included: breakfastIncluded,
                breakfast_price: breakfastTotalPrice,
                total_price: breakfastPrice + reservation.total_price,
              },
            })
          }
          disabled={!isConfirmed}
        >
          Check in
        </button>
      </div>
    </>
  );
}
