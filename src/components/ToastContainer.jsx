export default function ToastContainer({ children }) {
  return (
    <div
      className="toast-container position-absolute top-0 start-50 translate-middle-x p-3"
      aria-live="polite"
      aria-atomic="true"
    >
      {children}
    </div>
  );
}
