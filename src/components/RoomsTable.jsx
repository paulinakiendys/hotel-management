export default function RoomsTable({ rooms, isDeletingRoom, mutate }) {
  const tableHeaders = ["", "Room", "Capacity", "Rate", "Discount", ""];

  return (
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
          {rooms.map(({ id, imageUrl, number, capacity, rate, discount }) => (
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
              <td className="text-center align-middle">{discount * 100}%</td>
              <td className="text-center align-middle">
                <div className="btn-group" role="group">
                  <button className="btn btn-primary">Duplicate</button>
                  <button className="btn btn-warning">Edit</button>
                  <button
                    className="btn btn-danger"
                    onClick={() => mutate(id)}
                    disabled={isDeletingRoom}
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
  );
}
