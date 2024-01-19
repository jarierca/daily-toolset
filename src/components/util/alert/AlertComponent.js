// src/components/AlertComponent.js
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideMessage } from "../../../redux/Actions";

const AlertComponent = () => {
  const dispatch = useDispatch();
  const msgType = useSelector((state) => state.app.msgType);
  const message = useSelector((state) => state.app.message);
  const duration =  useSelector((state) => state.app.duration);
  const isMessageVisible = useSelector((state) => state.app.isMessageVisible);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(isMessageVisible);

    const timeoutId = setTimeout(() => {
      dispatch(hideMessage());
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timeoutId);
  }, [isMessageVisible, dispatch, duration]);

  const getMessageType = () => {
    if (msgType === 0) {
      return "alert-info";
    } else if (msgType === 1) {
      return "alert-success";
    } else if (msgType === -1) {
      return "alert-danger";
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className={`alert ${getMessageType()} position-fixed bottom-0 start-50 translate-middle-x`}
          role="alert"
        >
          {message}
        </div>
      )}
    </>
  );
};

export default AlertComponent;
