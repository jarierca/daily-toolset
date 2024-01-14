// src/redux/actions.js
export const showInfoMessage = ({ message, duration }) => ({
  type: "SHOW_INFO_MESSAGE",
  payload: { message: message, duration: duration },
  msgType: 0,
});

export const showErrorMessage = ({ message, duration }) => ({
  type: "SHOW_ERROR_MESSAGE",
  payload: { message: message, duration: duration },
  msgType: -1,
});

export const showConfirmMessage = ({ message, duration }) => ({
  type: "SHOW_CONFIRM_MESSAGE",
  payload: { message: message, duration: duration },
  msgType: 1,
});

export const hideMessage = () => ({
  type: "HIDE_MESSAGE",
});
