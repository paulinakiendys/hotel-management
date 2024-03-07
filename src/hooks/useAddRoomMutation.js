import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom } from "../services/apiRooms";
import { useToasts } from "../contexts/ToastsContext";

export default function useAddRoomMutation() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      addToast("Successfully added room", "success");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      const modal = window.bootstrap.Modal.getInstance("#addRoomModal");
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
