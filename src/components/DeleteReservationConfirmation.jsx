import { useNavigate } from "react-router-dom";

export default function DeleteReservationConfirmation({
  deleteReservation,
  reservation,
  redirect = false,
}) {
  const navigate = useNavigate();
  return (
    <>
      <span>Are you sure you want to delete this reservation?</span>
      <hr className="border-secondary" />
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={() =>
            deleteReservation(reservation.id, {
              onSuccess: () => {
                if (redirect) {
                  navigate(-1);
                }
              },
            })
          }
        >
          Delete
        </button>
      </div>
    </>
  );
}
