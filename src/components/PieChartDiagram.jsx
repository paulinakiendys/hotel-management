import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import calculateNights from "../utils/calculateNights";

export default function PieChartDiagram({ fulfilledReservations }) {
  const data = [
    {
      name: "1 night",
      value: 0,
      color: "#0d6efd",
    },
    {
      name: "2 nights",
      value: 0,
      color: "#6c757d",
    },
    {
      name: "3 nights",
      value: 0,
      color: "#198754",
    },
    {
      name: "4 nights",
      value: 0,
      color: "#dc3545",
    },
    {
      name: "5 nights",
      value: 0,
      color: "#ffc107",
    },
    {
      name: "6 nights",
      value: 0,
      color: "#0dcaf0",
    },
    {
      name: "7 nights",
      value: 0,
      color: "#212529",
    },
  ];

  fulfilledReservations?.forEach((reservation) => {
    const nights = calculateNights(
      reservation.check_in_date,
      reservation.check_out_date
    );
    const index = nights - 1;
    if (index >= 0 && index < data.length) {
      data[index].value++;
    }
  });
  return (
    <div className="col-12 col-md-6">
      <h2>Stay duration</h2>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            paddingAngle={1}
          >
            {data.map((data) => (
              <Cell key={data.name} fill={data.color} stroke={data} />
            ))}
          </Pie>
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconType="circle"
          />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
