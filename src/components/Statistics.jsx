import calculateNights from "../utils/calculateNights";

export default function Statistics({
  stays,
  period,
  rooms,
  reservations,
  fulfilledReservations,
}) {
  const revenue = reservations?.reduce(
    (acc, curr) => acc + curr.total_price,
    0
  );

  const occupancy =
    stays?.reduce(
      (acc, cur) =>
        acc + calculateNights(cur.check_in_date, cur.check_out_date),
      0
    ) /
    (period * rooms.length);
  return (
    <>
      <div className="row gx-2 gy-2 gy-md-0">
        <div className="col-6 col-sm-3">
          <div className="p-3 bg-secondary-subtle border border-secondary-subtle rounded">
            <span className="text-uppercase fw-bold">Reservations</span>
            <br />
            <span className="fs-3">{reservations.length}</span>
          </div>
        </div>
        <div className="col-6 col-sm-3">
          <div className="p-3 bg-secondary-subtle border border-secondary-subtle rounded">
            <span className="text-uppercase fw-bold">Revenue</span>
            <br />
            <span className="fs-3">${revenue}</span>
          </div>
        </div>
        <div className="col-6 col-sm-3">
          <div className="p-3 bg-secondary-subtle border border-secondary-subtle rounded">
            <span className="text-uppercase fw-bold">Stays</span>
            <br />
            <span className="fs-3">{fulfilledReservations.length}</span>
          </div>
        </div>
        <div className="col-6 col-sm-3">
          <div className="p-3 bg-secondary-subtle border border-secondary-subtle rounded">
            <span className="text-uppercase fw-bold">Occupancy</span>
            <br />
            <span className="fs-3">{Math.round(occupancy * 100)} %</span>
          </div>
        </div>
      </div>
    </>
  );
}
