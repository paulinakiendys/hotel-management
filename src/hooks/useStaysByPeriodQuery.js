import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../services/apiReservations";
import { useSearchParams } from "react-router-dom";

export default function useStaysByPeriodQuery() {
  const [searchParams] = useSearchParams();

  const period = searchParams.get("period") || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - period);
  const {
    isLoading,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["stays", period],
    queryFn: () => getStaysAfterDate(startDate.toISOString()),
  });

  const fulfilledReservations = reservations?.filter(
    (reservation) =>
      reservation.status === "checked in" ||
      reservation.status === "checked out"
  );

  return { isLoading, error, reservations, fulfilledReservations, period };
}
