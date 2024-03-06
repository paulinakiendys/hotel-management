import { useState } from "react";
import EditRoomForm from "./EditRoomForm";
import Modal from "./Modal";

export default function RoomsTable({ rooms, isPending, mutate }) {
  const tableHeaders = ["", "Room number", "Capacity", "Rate", "Discount", ""];
  const [room, setRoom] = useState({});
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
            {rooms.map((room) => (
              <tr key={room.id}>
                <th scope="row" className="text-center">
                  <img
                    src={room.image}
                    alt={`Room ${room.number}`}
                    style={{ maxWidth: "100px", maxHeight: "100px" }}
                  />
                </th>
                <td className="text-center align-middle">{room.number}</td>
                <td className="text-center align-middle">{room.capacity}</td>
                <td className="text-center align-middle">${room.rate}</td>
                <td className="text-center align-middle">{room.discount}%</td>
                <td className="text-center align-middle">
                  <div className="btn-group" role="group">
                    <button className="btn btn-primary" disabled={isPending}>
                      Duplicate
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => setRoom(room)}
                      data-bs-toggle="modal"
                      data-bs-target="#editRoomModal"
                      disabled={isPending}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => mutate(room.id)}
                      disabled={isPending}
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
    </>
  );
}
