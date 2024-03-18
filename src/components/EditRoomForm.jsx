import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import Spinner from "./Spinner";
import Alert from "./Alert";
import useEditRoomMutation from "../hooks/useEditRoomMutation";
import useSettingsQuery from "../hooks/useSettingsQuery";

const EditRoomForm = ({ room }) => {
  const { id, ...values } = room;

  const { register, handleSubmit, reset } = useForm({
    values,
  });

  const { mutate, isPending } = useEditRoomMutation({ id });

  const { isLoading, settings, error } = useSettingsQuery();

  const onSubmit = (data) => {
    mutate({
      ...data,
      image: data.image instanceof FileList ? data.image[0] : data.image,
    });
  };

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;

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
          min={1}
          disabled={isPending}
          aria-describedby="capacityHelp"
        />
        <div id="capacityHelp" className="form-text">
          Maximum guests per booking is currently set to{" "}
          {settings.max_guests_per_booking}. Update in{" "}
          <NavLink
            to={"/settings"}
            onClick={() => {
              const modal =
                window.bootstrap.Modal.getInstance("#editRoomModal");
              if (modal) {
                modal.hide();
              }
            }}
          >
            Settings
          </NavLink>
          .
        </div>
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
            {...register("discount")}
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
          disabled={isPending}
        />
      </div>
      <hr className="border-secondary" />
      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
          onClick={() => reset()}
          disabled={isPending}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={isPending}>
          Update room
        </button>
      </div>
    </form>
  );
};

export default EditRoomForm;
