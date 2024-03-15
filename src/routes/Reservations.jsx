import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import ReservationsTable from "../components/ReservationsTable";
import Filter from "../components/Filter";
import Sort from "../components/Sort";

import useReservationsQuery from "../hooks/useReservationsQuery";
import useDeleteReservationMutation from "../hooks/useDeleteReservationMutation";

export default function Reservations() {
  const { isLoading, reservations, count, error } = useReservationsQuery();

  const { mutate, isPending } = useDeleteReservationMutation();

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <h1>Reservations</h1>
        <div className="d-flex gap-3">
          <Filter
            searchParam="status"
            options={[
              {
                value: "all",
                label: "All",
              },
              {
                value: "pending",
                label: "Pending",
              },
              {
                value: "checked-in",
                label: "Checked-in",
              },
              {
                value: "checked-out",
                label: "Checked-out",
              },
            ]}
          />
          <Sort
            options={[
              {
                value: "check_in_date-asc",
                label: "Date: low to high",
              },
              {
                value: "check_in_date-desc",
                label: "Date: high to low",
              },
              {
                value: "total_price-asc",
                label: "Total price: low to high",
              },
              {
                value: "total_price-desc",
                label: "Total price: high to low",
              },
            ]}
          />
        </div>
      </div>

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
