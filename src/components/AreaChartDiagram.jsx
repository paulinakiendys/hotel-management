import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function AreaChartDiagram({ period, reservations }) {
  const dates = [];
  const today = new Date();

  for (let i = period - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    dates.push(date.toISOString().split("T")[0]);
  }

  const data = dates.map((date) => ({
    label: date,
    reservations_total: reservations
      ?.filter((reservation) => reservation.created_at.split("T")[0] === date)
      .reduce((acc, curr) => acc + curr.total_price, 0),
    breakfast_total: reservations
      ?.filter((reservation) => reservation.created_at.split("T")[0] === date)
      .reduce((acc, curr) => acc + curr.breakfast_price, 0),
  }));
  return (
    <>
      <h2>Sales</h2>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <XAxis dataKey="label" />
          <YAxis unit={"$"} />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="reservations_total"
            stroke="#0d6efd"
            fillOpacity={1}
            fill="#0d6efd"
            name="Reservations total"
            unit={"$"}
          />
          <Area
            type="monotone"
            dataKey="breakfast_total"
            stroke="#6c757d"
            fillOpacity={1}
            fill="#6c757d"
            name="Breakfasts total"
            unit={"$"}
          />
        </AreaChart>
      </ResponsiveContainer>
    </>
  );
}
