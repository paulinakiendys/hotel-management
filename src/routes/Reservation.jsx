import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/Alert";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import useReservationQuery from "../hooks/useReservationQuery";
import formatDate from "../utils/formatDate";
import calculateNightsText from "../utils/calculateNightsText";
import Modal from "../components/Modal";
import DeleteReservationConfirmation from "../components/DeleteReservationConfirmation";
import CheckInReservationConfirmation from "../components/CheckInReservationConfirmation";
import useDeleteReservationMutation from "../hooks/useDeleteReservationMutation";
import useUpdateReservationMutation from "../hooks/useUpdateReservationMutation";

export default function Reservation() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const { isLoading, reservation, error } = useReservationQuery(reservationId);
  const { isPending: isDeletingReservation, mutate: deleteReservation } =
    useDeleteReservationMutation();
  const { isPending: isUpdatingReservation, mutate: updateReservation } =
    useUpdateReservationMutation();

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

  const { nights, nightText } = calculateNightsText(
    reservation.check_in_date,
    reservation.check_out_date
  );

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center gap-3">
            <h1>Reservation {reservation.id}</h1>
            <span
              className={`badge rounded-pill ${
                reservation.status === "checked in"
                  ? "text-bg-success"
                  : reservation.status === "checked out"
                  ? "text-bg-secondary"
                  : "text-bg-warning"
              }`}
            >
              {reservation.status}
            </span>
            {reservation.breakfast_included && (
              <span className="badge rounded-pill text-bg-info">breakfast</span>
            )}
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title">
            {nights} {nightText} in Room {reservation.rooms.number}
          </h5>

          <h6 className="card-subtitle mb-2 text-body-secondary">
            {formatDate(reservation.check_in_date)} &mdash;{" "}
            {formatDate(reservation.check_out_date)}
          </h6>
          <hr className="border-secondary" />
          <p className="card-text">
            <strong>
              {reservation.guests.first_name} {reservation.guests.last_name}
              {reservation.number_of_guests - 1 > 0 &&
                ` + ${reservation.number_of_guests - 1} ${
                  reservation.number_of_guests - 1 === 1 ? "guest" : "guests"
                }`}{" "}
            </strong>
            <a href={`mailto:${reservation.guests.email}`}>
              {reservation.guests.email}
            </a>
          </p>
          <hr className="border-secondary" />
          <div
            className={`d-flex justify-content-between align-items-center p-3 ${
              reservation.is_paid
                ? "bg-success-subtle text-success-emphasis"
                : "bg-danger-subtle text-danger-emphasis"
            }`}
          >
            <span>
              Total price: <strong>${reservation.total_price}</strong> ({nights}{" "}
              {nightText} &times; ${reservation.room_rate})
              {reservation.breakfast_included && (
                <> + ${reservation.breakfast_price} breakfast</>
              )}
            </span>
            <span
              className={`badge rounded-pill ${
                reservation.is_paid ? "text-bg-success" : "text-bg-danger"
              }`}
            >
              {reservation.is_paid ? "paid" : "unpaid"}
            </span>
          </div>
        </div>
        <div className="card-footer text-end">
          <small className="text-body-secondary">
            created {formatDate(reservation.created_at)}
          </small>
        </div>
      </div>
      <div className="d-flex gap-3 justify-content-end">
        {reservation.status === "pending" && (
          <button
            className="btn btn-success"
            disabled={isUpdatingReservation}
            data-bs-toggle="modal"
            data-bs-target="#checkInReservationModal"
          >
            Check in
          </button>
        )}
        {reservation.status === "checked in" && (
          <button
            className="btn btn-secondary"
            disabled={isUpdatingReservation}
            onClick={() => {
              updateReservation({
                reservationId: reservation.id,
                updatedReservationData: { status: "checked out" },
              });
              navigate(-1);
            }}
          >
            Check out
          </button>
        )}
        {reservation.status === "checked out" && (
          <button className="btn btn-secondary" disabled>
            Checked out
          </button>
        )}
        <button
          className="btn btn-danger"
          data-bs-toggle="modal"
          data-bs-target="#deleteReservationModal"
          disabled={isDeletingReservation}
        >
          Delete
        </button>
        <BackButton />
      </div>
      <Modal id="deleteReservationModal" title={"Delete reservation"}>
        <DeleteReservationConfirmation
          deleteReservation={deleteReservation}
          reservation={reservation}
          redirect={true}
        />
      </Modal>
      <Modal id="checkInReservationModal" title={"Check in reservation"}>
        <CheckInReservationConfirmation
          updateReservation={updateReservation}
          reservation={reservation}
        />
      </Modal>
    </>
  );
}
