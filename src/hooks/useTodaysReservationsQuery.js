import { useQuery } from "@tanstack/react-query";
import { getTodaysReservations } from "../services/apiReservations";

export default function useTodaysReservationsQuery() {
  const {
    isLoading,
    data: reservations,
    error,
  } = useQuery({
    queryKey: ["today's reservations"],
    queryFn: getTodaysReservations,
  });

  return { isLoading, reservations, error };
}
