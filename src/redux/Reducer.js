// src/redux/reducer.js
const initialState = {
  message: "",
  isMessageVisible: false,
  duration: 2500, 
  msgType: 0,
};


const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_INFO_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration,
        isMessageVisible: true,
        msgType: action.msgType,
      };
    case "SHOW_ERROR_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration,
        isMessageVisible: true,
        msgType: action.msgType,
      };
    case "SHOW_WARNING_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration,
        isMessageVisible: true,
        msgType: action.msgType,
      };
    case "SHOW_SUCCESS_MESSAGE":
      return {
        ...state,
        message: action.payload.message,
        duration: action.payload.duration,
        isMessageVisible: true,
        msgType: action.msgType,
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
