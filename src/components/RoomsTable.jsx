import { useState } from "react";
import EditRoomForm from "./EditRoomForm";
import Modal from "./Modal";
import DeleteRoomConfirmation from "./DeleteRoomConfirmation";
import useAddRoomMutation from "../hooks/useAddRoomMutation";
import { useSearchParams } from "react-router-dom";

export default function RoomsTable({
  rooms,
  isPending: isDeletingRoom,
  mutate: deleteRoom,
}) {
  const [searchParams] = useSearchParams();

  const filter = searchParams.get("discount");
  const sort = searchParams.get("sort") || "number";
  const dir = searchParams.get("dir") || "asc";

  let filteredRooms = rooms;

  if (filter === "true") {
    filteredRooms = rooms.filter((room) => room.discount > 0);
  } else if (filter === "false") {
    filteredRooms = rooms.filter((room) => room.discount === 0);
  }
  const modifier = dir === "asc" ? 1 : -1;

  const sortedRooms = filteredRooms.sort(
    (a, b) => (a[sort] - b[sort]) * modifier
  );

  const tableHeaders = ["", "Room number", "Capacity", "Rate", "Discount", ""];
  const [room, setRoom] = useState({});

  const { isPending: isDuplicatingRoom, mutate: duplicateRoom } =
    useAddRoomMutation();

  function handleDuplicate(room) {
    const duplicatedRoomData = { ...room };
    delete duplicatedRoomData.id;
    delete duplicatedRoomData.created_at;
    duplicateRoom(duplicatedRoomData);
  }

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
            {sortedRooms.map((room) => (
              <tr key={room.id}>
                <td className="text-center align-middle">
                  <img
                    src={room.image}
                    alt={`Room ${room.number}`}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </td>
                <td className="text-center align-middle">{room.number}</td>
                <td className="text-center align-middle">{room.capacity}</td>
                <td className="text-center align-middle">${room.rate}</td>
                <td className="text-center align-middle">
                  {room.discount !== 0 ? `${room.discount}%` : ""}
                </td>
                <td className="text-center align-middle">
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-primary"
                      disabled={isDuplicatingRoom}
                      onClick={() => handleDuplicate(room)}
                    >
                      Duplicate
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => setRoom(room)}
                      data-bs-toggle="modal"
                      data-bs-target="#editRoomModal"
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      disabled={isDeletingRoom}
                      onClick={() => setRoom(room)}
                      data-bs-toggle="modal"
                      data-bs-target="#deleteRoomModal"
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
      <Modal id="editRoomModal" title={"Edit room"}>
        <EditRoomForm room={room} />
      </Modal>
      <Modal id="deleteRoomModal" title={"Delete room"}>
        <DeleteRoomConfirmation deleteRoom={deleteRoom} room={room} />
      </Modal>
    </>
  );
}
