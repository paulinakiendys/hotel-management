import { useParams } from "react-router-dom";
import Alert from "../components/Alert";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import useReservationQuery from "../hooks/useReservationQuery";
import calculateNights from "../utils/calculateNights";
import formatDate from "../utils/formatDate";
import Modal from "../components/Modal";
import DeleteReservationConfirmation from "../components/DeleteReservationConfirmation";
import useDeleteReservationMutation from "../hooks/useDeleteReservationMutation";

export default function Reservation() {
  const { reservationId } = useParams();
  const { isLoading, reservation, error } = useReservationQuery(reservationId);
  const { isPending: isDeletingReservation, mutate: deleteReservation } =
    useDeleteReservationMutation();

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

  return (
    <>
      <div className="card">
        <div className="card-header">
          <div className="d-flex align-items-center gap-3">
            <h1>Reservation {reservation.id}</h1>
            <span
              className={`badge rounded-pill ${
                reservation.status === "checked-in"
                  ? "text-bg-success"
                  : reservation.status === "checked-out"
                  ? "text-bg-secondary"
                  : "text-bg-warning"
              }`}
            >
              {reservation.status}
            </span>
            {reservation.breakfast_included && (
              <span className="badge rounded-pill text-bg-info">
                breakfast included
              </span>
            )}
          </div>
        </div>

        <div className="card-body">
          <h5 className="card-title">
            {calculateNights(
              reservation.check_in_date,
              reservation.check_out_date
            )}{" "}
            {calculateNights(
              reservation.check_in_date,
              reservation.check_out_date
            ) === 1
              ? "night"
              : "nights"}{" "}
            in Room {reservation.rooms.number}
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
              Total price: <strong>${reservation.total_price}</strong>
              {reservation.breakfast_included && (
                <>
                  {" "}
                  (${reservation.room_rate} room + $
                  {reservation.breakfast_price} breakfast)
                </>
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
    </>
  );
}
