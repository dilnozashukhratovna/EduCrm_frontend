import { createToast } from "mosha-vue-toastify";
import "mosha-vue-toastify/dist/style.css";

const Notification = (text, color, timeout = 2000) => {
  createToast(text, {
    position: "top-right",
    type: color,
    transition: "bounce",
    timeout: timeout,
  });
};

export default Notification;
