import { useState } from "react";
import { NavLink } from "react-router-dom";
import Modal from "./Modal";
import DeleteReservationConfirmation from "./DeleteReservationConfirmation";
import formatDate from "../utils/formatDate";
import calculateNights from "../utils/calculateNights";
import CheckInReservationConfirmation from "./CheckInReservationConfirmation";
import useUpdateReservationMutation from "../hooks/useUpdateReservationMutation";

export default function ReservationsTable({
  reservations,
  isPending: isDeletingReservation,
  mutate: deleteReservation,
}) {
  const tableHeaders = [
    "Room number",
    "Guest",
    "Dates",
    "Nights",
    "Status",
    "Total price",
    "",
  ];
  const [reservation, setReservation] = useState({});

  const { isPending: isUpdatingReservation, mutate: updateReservation } =
    useUpdateReservationMutation();

  return (
    <>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              {tableHeaders.map((header, index) => (
                <th key={index} scope="col" className="text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td className="text-center align-middle">
                  {reservation.rooms.number}
                </td>
                <td className="align-middle">
                  {reservation.guests.first_name} {reservation.guests.last_name}
                  <br />
                  <span className="small text-body-secondary">
                    {reservation.guests.email}
                  </span>
                </td>
                <td className="text-center align-middle">
                  {formatDate(reservation.check_in_date)} &mdash;{" "}
                  {formatDate(reservation.check_out_date)}
                </td>
                <td className="text-center align-middle">
                  {calculateNights(
                    reservation.check_in_date,
                    reservation.check_out_date
                  )}
                </td>
                <td className="text-center align-middle">
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
                </td>
                <td className="text-center align-middle">
                  ${reservation.total_price}
                </td>
                <td className="text-center align-middle">
                  <div className="btn-group" role="group">
                    <NavLink
                      className="btn btn-primary"
                      to={`/reservations/${reservation.id}`}
                    >
                      View
                    </NavLink>
                    {reservation.status === "pending" && (
                      <button
                        className="btn btn-success"
                        disabled={isUpdatingReservation}
                        onClick={() => setReservation(reservation)}
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
                        onClick={() =>
                          updateReservation({
                            reservationId: reservation.id,
                            updatedReservationData: { status: "checked out" },
                          })
                        }
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
                      disabled={isDeletingReservation}
                      onClick={() => setReservation(reservation)}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteReservationModal"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal id="deleteReservationModal" title={"Delete reservation"}>
        <DeleteReservationConfirmation
          deleteReservation={deleteReservation}
          reservation={reservation}
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
