import { useQuery } from "@tanstack/react-query";
import { getRooms } from "../services/apiRooms";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";

export default function Rooms() {
  const {
    isLoading,
    data: rooms = [],
    error,
  } = useQuery({
    queryKey: ["rooms"],
    queryFn: getRooms,
  });

  const tableHeaders = ["", "Room", "Capacity", "Rate", "Discount", ""];

  if (isLoading) return <Spinner />;
  if (error) return <Alert variant="danger" message={error.message} />;

  return (
    <>
      <h2>Rooms</h2>
      {!isLoading && rooms.length === 0 ? (
        <Alert variant="info" message="No rooms available" />
      ) : (
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
              {rooms.map(
                ({ id, imageUrl, number, capacity, rate, discount }) => (
                  <tr key={id}>
                    <th scope="row" className="text-center">
                      <img
                        src={imageUrl}
                        alt={`Room ${number}`}
                        style={{ maxWidth: "100px", maxHeight: "100px" }}
                      />
                    </th>
                    <td className="text-center align-middle">{number}</td>
                    <td className="text-center align-middle">{capacity}</td>
                    <td className="text-center align-middle">${rate}</td>
                    <td className="text-center align-middle">
                      {discount * 100}%
                    </td>
                    <td className="text-center align-middle">
                      <div className="btn-group" role="group">
                        <button className="btn btn-primary">Duplicate</button>
                        <button className="btn btn-warning">Edit</button>
                        <button className="btn btn-danger">Delete</button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      <button className="btn btn-success">Add room</button>
    </>
  );
}
