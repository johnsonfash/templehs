'use client'

import { ToastContainer } from "react-toastify";

const Toast = () => {
  return <ToastContainer
    autoClose={2500}
    theme="colored"
    draggablePercent={60}
    closeOnClick
  />;
};

export default Toast;
