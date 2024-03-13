export default function DeleteRoomConfirmation({ deleteRoom, room }) {
  return (
    <>
      <span>Are you sure you want to delete this room?</span>
      <hr className="border-secondary" />
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-secondary" data-bs-dismiss="modal">
          Cancel
        </button>
        <button className="btn btn-danger" onClick={() => deleteRoom(room.id)}>
          Delete
        </button>
      </div>
    </>
  );
}
