import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";
import ToastContainer from "../components/ToastContainer";

const ToastsContext = createContext();

export const ToastsProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, variant) => {
    setToasts((prevToasts) => [
      ...prevToasts,
      { id: Date.now(), variant, message },
    ]);
  };

  return (
    <ToastsContext.Provider value={{ toasts, addToast }}>
      {children}
      <ToastContainer>
        {toasts.map(({ id, variant, message }) => (
          <Toast key={id} variant={variant} message={message} />
        ))}
      </ToastContainer>
    </ToastsContext.Provider>
  );
};

export const useToasts = () => {
  const context = useContext(ToastsContext);
  if (!context) {
    throw new Error("useToasts must be used within a ToastsProvider");
  }
  return context;
};
