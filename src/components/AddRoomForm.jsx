import { useForm } from "react-hook-form";
import { useToasts } from "../contexts/ToastsContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRoom } from "../services/apiRooms";

const AddRoomForm = () => {
  const { addToast } = useToasts();
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const onCancel = () => {
    reset();
  };

  const { isPending, mutate } = useMutation({
    mutationFn: addRoom,
    onSuccess: () => {
      addToast("Successfully added room", "success");
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      reset();
      const modal = window.bootstrap.Modal.getInstance("#addRoomModal");
      modal.hide();
    },
    onError: (error) => {
      addToast(error.message, "danger");
    },
  });

  const onSubmit = (data) => {
    mutate({ ...data, image: data.image[0] });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Room number
        </label>
        <input
          type="number"
          className="form-control"
          id="number"
          {...register("number")}
          required
          min={1}
          disabled={isPending}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="capacity" className="form-label">
          Capacity
        </label>
        <input
          type="number"
          className="form-control"
          id="capacity"
          {...register("capacity")}
          required
          min={1}
          disabled={isPending}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="rate" className="form-label">
          Rate
        </label>
        <div className="input-group">
          <span className="input-group-text">$</span>
          <input
            type="number"
            className="form-control"
            aria-label="Rate"
            {...register("rate")}
            required
            min={0}
            disabled={isPending}
          />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="discount" className="form-label">
          Discount
        </label>
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            aria-label="discount"
            defaultValue={0}
            {...register("discount")}
            required
            min={0}
            max={100}
            disabled={isPending}
          />
          <span className="input-group-text">%</span>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="description"
          rows="3"
          {...register("description")}
          required
          disabled={isPending}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="image" className="form-label">
          Image
        </label>
        <input
          className="form-control"
          type="file"
          id="image"
          accept="image/*"
          {...register("image")}
          required
          disabled={isPending}
        />
      </div>
      <hr className="border-secondary" />

      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => onCancel()}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          Add new room
        </button>
      </div>
    </form>
  );
};

export default AddRoomForm;
