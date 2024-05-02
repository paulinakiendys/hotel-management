import { useQuery } from "@tanstack/react-query";
import { getReservationsAfterDate } from "../services/apiReservations";
import { useSearchParams } from "react-router-dom";

export default function useReservationsByPeriodQuery() {
  const [searchParams] = useSearchParams();

  const period = searchParams.get("period") || 7;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - period);
  const {
    isLoading,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["reservations", period],
    queryFn: () => getReservationsAfterDate(startDate.toISOString()),
  });

  return { isLoading, reservations, error };
}
