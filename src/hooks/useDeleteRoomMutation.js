import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRoom } from "../services/apiRooms";
import { useToasts } from "../contexts/ToastsContext";

export default function useDeleteRoomMutation() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    mutationFn: deleteRoom,
    onSuccess: () => {
      addToast("Successfully deleted room", "success");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
    },
    onError: (error) => {
      addToast(error.message, "danger");
    },
  });
  return { isPending, mutate };
}
