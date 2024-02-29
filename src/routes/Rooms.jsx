import { useEffect, useState } from "react";
import { getRooms } from "../services/apiRooms";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    async function fetchRooms() {
      try {
        const fetchedRooms = await getRooms();
        setRooms(fetchedRooms || []);
      } catch (error) {
        console.error("Error fetching rooms:", error.message);
      }
    }

    fetchRooms();
  }, []);

  return (
    <>
      <h2>Rooms</h2>
      {rooms.length === 0 ? (
        <p>No rooms available.</p>
      ) : (
        <ul>
          {rooms.map((room) => (
            <li key={room.number}>
              <h3>{room.number}</h3>
              <p>Capacity: {room.capacity}</p>
              <p>Rate: ${room.rate}</p>
              <p>Discount: {room.discount * 100}%</p>
              <p>Description: {room.description}</p>
              <img
                src={room.imageUrl}
                alt={`Room ${room.number}`}
                style={{ maxWidth: "200px" }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
