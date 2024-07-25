// src/redux/actions.js

export const showInfoMessage = ({ message, duration }) => ({
  type: "SHOW_INFO_MESSAGE",
  payload: { message, duration },
  msgType: 0,
});

export const showSuccessMessage = ({ message, duration }) => ({
  type: "SHOW_SUCCESS_MESSAGE",
  payload: { message, duration },
  msgType: 1,
});

export const showErrorMessage = ({ message, duration }) => ({
  type: "SHOW_ERROR_MESSAGE",
  payload: { message, duration },
  msgType: -1,
});

export const showWarningMessage = ({ message, duration }) => ({
  type: "SHOW_WARNING_MESSAGE",
  payload: { message, duration },
  msgType: -2,
});

export const hideMessage = () => ({
  type: "HIDE_MESSAGE",
});

