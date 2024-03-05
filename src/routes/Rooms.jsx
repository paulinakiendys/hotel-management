import { useToasts } from "../contexts/ToastsContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteRoom, getRooms } from "../services/apiRooms";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import RoomsTable from "../components/RoomsTable";
import Modal from "../components/Modal";
import AddRoomForm from "../components/AddRoomForm";

export default function Rooms() {
  const queryClient = useQueryClient();
  const { addToast } = useToasts();

  const {
    isLoading,
    data: rooms = [],
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const { isPending, mutate } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      addToast("Successfully deleted room", "success");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      addToast(error.message, "danger");
    },
  });

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
      <Modal title={"Add a new room"}>
        <AddRoomForm />
      </Modal>
    </>
  );
}
