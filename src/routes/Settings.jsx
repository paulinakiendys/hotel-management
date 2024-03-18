import { useForm } from "react-hook-form";
import useSettingsQuery from "../hooks/useSettingsQuery";
import Spinner from "../components/Spinner";
import Alert from "../components/Alert";
import useEditSettingsMutation from "../hooks/useEditSettingsMutation";

export default function Settings() {
  const { isLoading, settings, error } = useSettingsQuery();
  const { register, handleSubmit, reset } = useForm({ values: settings });
  const { isPending, mutate } = useEditSettingsMutation();
  const onSubmit = (data) => {
    mutate(data);
  };

  if (isLoading) return <Spinner />;

  if (error) return <Alert variant="danger" message={error.message} />;
  return (
    <>
      <h1>Settings</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="min_nights_per_booking" className="form-label">
            Minimum nights per booking
          </label>
          <input
            type="number"
            className="form-control"
            id="min_nights_per_booking"
            {...register("min_nights_per_booking")}
            disabled={isPending}
            required
            min={1}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="max_nights_per_booking" className="form-label">
            Maximum nights per booking
          </label>
          <input
            type="number"
            className="form-control"
            id="max_nights_per_booking"
            {...register("max_nights_per_booking")}
            disabled={isPending}
            required
            min={0}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="max_guests_per_booking" className="form-label">
            Maximum guests per booking
          </label>
          <input
            type="number"
            className="form-control"
            id="max_guests_per_booking"
            {...register("max_guests_per_booking")}
            disabled={isPending}
            required
            min={0}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="breakfast_price" className="form-label">
            Breakfast price
          </label>
          <div className="input-group">
            <span className="input-group-text">$</span>
            <input
              type="number"
              className="form-control"
              id="breakfast_price"
              {...register("breakfast_price")}
              disabled={isPending}
              required
              min={0}
            />
          </div>
        </div>
        <hr className="border-secondary" />

        <div className="d-flex justify-content-end gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => reset()}
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isPending}
          >
            Update settings
          </button>
        </div>
      </form>
    </>
  );
}
