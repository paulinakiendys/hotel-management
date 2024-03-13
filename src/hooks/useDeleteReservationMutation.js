import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToasts } from "../contexts/ToastsContext";
import { deleteReservation } from "../services/apiReservations";

export default function useDeleteReservationMutation() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteReservation,
    onSuccess: () => {
      addToast("Successfully deleted reservation", "success");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      window.bootstrap.Modal.getInstance("#deleteReservationModal").hide();
    },
    onError: (error) => {
      addToast(error.message, "danger");
    },
  });
  return { isPending, mutate };
}
