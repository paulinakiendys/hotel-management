import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import RoomsTable from "../components/RoomsTable";
import Modal from "../components/Modal";
import AddRoomForm from "../components/AddRoomForm";

import useRoomsQuery from "../hooks/useRoomsQuery";
import useDeleteRoomMutation from "../hooks/useDeleteRoomMutation";

export default function Rooms() {
  const { isLoading, rooms, error } = useRoomsQuery();

  const { mutate, isPending } = useDeleteRoomMutation();

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

  return (
    <>
      <h2>Rooms</h2>
      {rooms.length === 0 ? (
        <Alert variant="info" message="No rooms available" />
      ) : (
        <RoomsTable rooms={rooms} isPending={isPending} mutate={mutate} />
      )}
      <button
        className="btn btn-success"
        data-bs-toggle="modal"
        data-bs-target="#addRoomModal"
      >
        Add room
      </button>
      <Modal id="addRoomModal" title={"Add a new room"}>
        <AddRoomForm />
      </Modal>
    </>
  );
}
