import axios from "axios";
import * as url from "./url_helper";

export const respStatus = {
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  NOT_AUTHORISED: "You are not authorised.",
};

// Register Method
const base_url = window.location.origin;
const axiosApi = axios.create({
  baseURL:
    process.env.REACT_APP_ENABLE_LOCAL_API === 1
      ? process.env.REACT_APP_API_URL
      : base_url,
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);
const makeAjax = (
  extension,
  data,
  micro_service = url.USER_MS_EXT,
  header = null
) => {
  let end_url =
    url.API_PREFIX + micro_service + url.APPLICATION_EXT + extension;
  if (process.env.REACT_APP_ENABLE_LOCAL_API === 2) {
    end_url = micro_service + url.APPLICATION_EXT + extension;
  }
  
  return axiosApi
    .post(end_url, data)
    .then((response) => {
      if (response.data.statue === "ERROR") {
        window.location.href = base_url + "/";
      }
      return response.data;
    })
    .catch((err) => {
      catchAxioExc(err);
      return { status: "ERROR", data: null, messages: generateCatchMsg(err) };
    });
};


const generateCatchMsg = (err) => {
  var message;
  if (err.response && err.response.status) {
    switch (err.response.status) {
      case 404:
        message = "Sorry! the API you are looking for could not be found";
        break;
      case 500:
        message =
          "Sorry! something went wrong, please contact our support team";
        break;
      case 401:
        message = "Invalid credentials";
        break;
      default:
        message = err[1];
        break;
    }
    return message;
  }
};

const catchAxioExc = (err) => {
  var message = generateCatchMsg(err);
  showMessage(message, "error");
};

const showMessage = (data, toastType, title) => {
  let message = data;
  if (data.messages) message = data.messages;
  if (!toastType) {
    toastType = data.status == "SUCCESS" ? "SUCCESS" : "error";
  }
  if (!title) title = toastType == "success" ? "Success" : camelCase(toastType);
};


const camelCase = (message) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};

export { makeAjax, url, showMessage, camelCase };
