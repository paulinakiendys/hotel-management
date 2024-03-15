import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import RoomsTable from "../components/RoomsTable";
import Modal from "../components/Modal";
import AddRoomForm from "../components/AddRoomForm";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

import useRoomsQuery from "../hooks/useRoomsQuery";
import useDeleteRoomMutation from "../hooks/useDeleteRoomMutation";

export default function Rooms() {
  const { isLoading, rooms, error } = useRoomsQuery();

  const { mutate, isPending } = useDeleteRoomMutation();

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Rooms</h1>
        <div className="d-flex gap-3">
          <Filter
            searchParam="discount"
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "true",
                label: "Discount",
              },
              {
                value: "false",
                label: "No discount",
              },
            ]}
          />
          <Sort
            options={[
              {
                value: "number-asc",
                label: "Room number: low to high",
              },
              {
                value: "number-desc",
                label: "Room number: high to low",
              },
              {
                value: "rate-asc",
                label: "Rate: low to high",
              },
              {
                value: "rate-desc",
                label: "Rate: high to low",
              },
              {
                value: "capacity-asc",
                label: "Capacity: low to high",
              },
              {
                value: "capacity-desc",
                label: "Capacity: high to low",
              },
            ]}
          />
        </div>
      </div>
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
