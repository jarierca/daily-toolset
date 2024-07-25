import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideMessage } from "../../../redux/Actions";
import './AlertComponent.css';

const AlertComponent = () => {
  const dispatch = useDispatch();
  const msgType = useSelector((state) => state.app.msgType);
  const message = useSelector((state) => state.app.message);
  const duration = useSelector((state) => state.app.duration);
  const isMessageVisible = useSelector((state) => state.app.isMessageVisible);
  const [isVisible, setIsVisible] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isMessageVisible) {
      setIsVisible(true);
      setRemainingTime(duration);

      // Set up the timeout to hide the message
      timeoutRef.current = setTimeout(() => {
        dispatch(hideMessage());
        setIsVisible(false);
      }, duration);

      // Set up the interval to update remaining time
      intervalRef.current = setInterval(() => {
        setRemainingTime((prevTime) => Math.max(prevTime - 100, 0));
      }, 100);

      return () => {
        clearTimeout(timeoutRef.current);
        clearInterval(intervalRef.current);
      };
    }
  }, [isMessageVisible, duration, dispatch]);

  const getMessageType = () => {
    switch (msgType) {
      case 0:
        return "alert-info";
      case 1:
        return "alert-success";
      case -1:
        return "alert-danger";
      case -2:
        return "alert-warning";
      default:
        return "alert-info";
    }
  };

  const getMessageIcon = () => {
    switch (msgType) {
      case 0:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
          </svg>
        );
      case 1:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-check-circle" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5 5 0 1 1 0-10A5 5 0 0 1 8 13zm3.354-7.854a.5.5 0 0 0-.708-.708L7.5 8.293 6.354 7.146a.5.5 0 0 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0l3.5-3.5z"/>
          </svg>
        );
      case -1:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
            <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zm0 12a5 5 0 1 1 0-10A5 5 0 0 1 8 13zm3.354-7.354a.5.5 0 0 0-.708-.708L8 7.293 5.854 5.146a.5.5 0 1 0-.708.708L7.293 8 5.146 10.146a.5.5 0 1 0 .708.708L8 8.707l2.146 2.147a.5.5 0 0 0 .708-.708L8.707 8l2.147-2.146z"/>
          </svg>
        );
      case -2:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L2 22h20L12 2z" fill="transparent" stroke="black" strokeWidth="2"/>
            <circle cx="12" cy="18" r="1.5" fill="black"/>
            <path d="M12 9v6" stroke="black" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M12 16v-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="12" cy="8" r="1" fill="currentColor"/>
          </svg>
        );
    }
  };

  return (
    <>
      {isVisible && (
        <div
          className={`alert ${getMessageType()} position-absolute`}
          role="alert"
        >
          <span className="me-2">{getMessageIcon()}</span>
          {message}
          <div
            className="progress-bar"
            style={{ width: `${(remainingTime / duration) * 100}%` }}
          />
        </div>
      )}
    </>
  );
};

export default AlertComponent;

