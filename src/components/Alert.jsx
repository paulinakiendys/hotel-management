export default function Alert({ variant, message }) {
  return (
    <div className={`alert alert-${variant}`} role="alert">
      {message}
    </div>
  );
}
