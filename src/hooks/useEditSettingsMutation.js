import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../services/apiSettings";
import { useToasts } from "../contexts/ToastsContext";

export default function useEditSettingsMutation() {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      addToast("Successfully updated settings", "success");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: (error) => {
      addToast(error.message, "danger");
    },
  });
  return { isPending, mutate };
}
