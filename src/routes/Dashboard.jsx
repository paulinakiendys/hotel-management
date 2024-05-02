import Alert from "../components/Alert";
import Filter from "../components/Filter";
import Spinner from "../components/Spinner";
import Statistics from "../components/Statistics";
import useReservationsByPeriodQuery from "../hooks/useReservationsByPeriodQuery";
import useRoomsQuery from "../hooks/useRoomsQuery";
import useStaysByPeriodQuery from "../hooks/useStaysByPeriodQuery";
import AreaChartDiagram from "../components/AreaChartDiagram";
import PieChartDiagram from "../components/PieChartDiagram";
import TodaysReservations from "../components/TodaysReservations";

export default function Dashboard() {
  const {
    isLoading: isLoadingReservations,
    reservations,
    error: reservationsError,
  } = useReservationsByPeriodQuery();
  const {
    isLoading: isLoadingStays,
    error: staysError,
    reservations: stays,
    fulfilledReservations,
    period,
  } = useStaysByPeriodQuery();
  const {
    isLoading: isLoadingRooms,
    rooms,
    error: roomsError,
  } = useRoomsQuery();

  if (isLoadingReservations || isLoadingStays || isLoadingRooms)
    return <Spinner />;

  if (reservationsError)
    return <Alert variant="danger" message={reservationsError.message} />;
  if (staysError)
    return <Alert variant="danger" message={staysError.message} />;
  if (roomsError)
    return <Alert variant="danger" message={roomsError.message} />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Dashboard</h1>
        <Filter
          searchParam="period"
          options={[
            {
              value: 7,
              label: "This week",
            },
            {
              value: 30,
              label: "This month",
            },
            {
              value: 90,
              label: "This quarter",
            },
          ]}
        />
      </div>

      <Statistics
        stays={stays}
        period={period}
        rooms={rooms}
        reservations={reservations}
        fulfilledReservations={fulfilledReservations}
      />
      <div className="row">
        <TodaysReservations />
        <PieChartDiagram fulfilledReservations={fulfilledReservations} />
      </div>
      <AreaChartDiagram period={period} reservations={reservations} />
    </>
  );
}
