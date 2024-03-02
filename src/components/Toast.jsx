import { useEffect, useRef } from "react";

export default function Toast({ variant, message }) {
  const toastRef = useRef(null);

  useEffect(() => {
    const toast = new window.bootstrap.Toast(toastRef.current);
    toast.show();
  }, []);

  return (
    <div
      ref={toastRef}
      className={`toast align-items-center text-white bg-${variant} border-0`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
      data-bs-animation="true"
    >
      <div className="d-flex">
        <div className="toast-body">{message}</div>
        <button
          type="button"
          className="btn-close btn-close-white me-2 m-auto"
          data-bs-dismiss="toast"
          aria-label="Close"
        />
      </div>
    </div>
  );
}
