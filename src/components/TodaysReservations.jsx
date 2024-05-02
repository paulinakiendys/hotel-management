import { NavLink } from "react-router-dom";
import useTodaysReservationsQuery from "../hooks/useTodaysReservationsQuery";
import calculateNightsText from "../utils/calculateNightsText";
import Alert from "./Alert";
import Spinner from "./Spinner";
import useUpdateReservationMutation from "../hooks/useUpdateReservationMutation";

export default function TodaysReservations() {
  const { isLoading, reservations, error } = useTodaysReservationsQuery();
  const { isPending, mutate } = useUpdateReservationMutation();
  return (
    <div className="col-12 col-md-6">
      <h2>Today</h2>
      {isLoading && <Spinner />}
      {error && <Alert variant="danger" message={error.message} />}
      <ul className="list-group">
        {reservations?.map((reservation) => {
          const { nights, nightText } = calculateNightsText(
            reservation.check_in_date,
            reservation.check_out_date
          );
          return (
            <li
              key={reservation.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span
                className={`badge rounded-pill text-bg-${
                  reservation.status === "pending" ? "success" : "secondary"
                }`}
              >
                {reservation.status === "pending" ? "arriving" : "departing"}
              </span>
              <span>
                {reservation.guests.first_name} {reservation.guests.last_name}
              </span>
              <span>
                {nights} {nightText}
              </span>
              {reservation.status === "pending" && (
                <NavLink
                  type="button"
                  to={`/reservations/${reservation.id}`}
                  className="btn btn-success"
                >
                  Check in
                </NavLink>
              )}
              {reservation.status === "checked in" && (
                <button
                  className="btn btn-secondary"
                  disabled={isPending}
                  onClick={() => {
                    mutate({
                      reservationId: reservation.id,
                      updatedReservationData: { status: "checked out" },
                    });
                  }}
                >
                  Check out
                </button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
