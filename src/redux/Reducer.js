// src/redux/reducer.js
const initialState = {
  message: "",
  isMessageVisible: false,
  duration: 2500, 
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_INFO_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration || 2500,
        msgType: 0,
        isMessageVisible: true,
      };
    case "SHOW_ERROR_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration || 2500,
        msgType: -1,
        isMessageVisible: true,
      };
    case "SHOW_CONFIRM_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration || 2500,
        msgType: 1,
        isMessageVisible: true,
      };
    case "HIDE_MESSAGE":
      return {
        ...state,
        isMessageVisible: false,
      };
    default:
      return state;
  }
};

export default reducer;
