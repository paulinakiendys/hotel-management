import { useQuery } from "@tanstack/react-query";
import { getReservation } from "../services/apiReservations";

export default function useReservationQuery(reservationId) {
  const {
    isLoading,
    data: reservation,
    error,
  } = useQuery({
    queryKey: ["reservation", reservationId],
    queryFn: () => getReservation(reservationId),
    enabled: !!reservationId,
  });

  return { isLoading, reservation, error };
}
