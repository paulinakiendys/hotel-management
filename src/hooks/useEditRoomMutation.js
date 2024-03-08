import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRoom } from "../services/apiRooms";
import { useToasts } from "../contexts/ToastsContext";

export default function useEditRoomMutation({ id }) {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (updatedData) => updateRoom(id, updatedData),
    onSuccess: () => {
      addToast("Successfully updated room", "success");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      window.bootstrap.Modal.getInstance("#editRoomModal").hide();
    },
    onError: (error) => {
      addToast(error.message, "danger");
    },
  });
  return { isPending, mutate };
}
