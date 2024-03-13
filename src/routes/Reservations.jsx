import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import ReservationsTable from "../components/ReservationsTable";

import useReservationsQuery from "../hooks/useReservationsQuery";
import useDeleteReservationMutation from "../hooks/useDeleteReservationMutation";

export default function Reservations() {
  const { isLoading, reservations, count, error } = useReservationsQuery();

  const { mutate, isPending } = useDeleteReservationMutation();

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

  return (
    <>
      <h1>Reservations</h1>
      {count === 0 ? (
        <Alert variant="info" message="No reservations available" />
      ) : (
        <ReservationsTable
          reservations={reservations}
          isPending={isPending}
          mutate={mutate}
        />
      )}
    </>
  );
}
