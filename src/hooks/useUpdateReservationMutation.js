import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReservation } from "../services/apiReservations";
import { useToasts } from "../contexts/ToastsContext";

export default function useUpdateReservationMutation() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (updateData) => updateReservation(updateData),
    onSuccess: () => {
      addToast("Successfully updated reservation", "success");
      queryClient.invalidateQueries({ queryKey: ["reservations"] });
      queryClient.invalidateQueries({ queryKey: ["reservation"] });
      const modal = window.bootstrap.Modal.getInstance(
        "#checkInReservationModal"
      );
      if (modal) {
        modal.hide();
      }
    },
    onError: (error) => {
      addToast(error.message, "danger");
    },
  });
  return { isPending, mutate };
}
