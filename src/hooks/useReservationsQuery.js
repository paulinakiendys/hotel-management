import { useQuery } from "@tanstack/react-query";
import { getReservations } from "../services/apiReservations";

export default function useReservationsQuery() {
  const {
    isLoading,
    data: { reservations = [], count } = {},
    error,
  } = useQuery({
    queryKey: ["reservations"],
    queryFn: getReservations,
  });

  return { isLoading, reservations, count, error };
}
