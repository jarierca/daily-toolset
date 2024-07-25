import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../../redux/Actions";
import "./Card.css";

const Card = ({ title, children, validateDni }) => {
  const dispatch = useDispatch();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(children);
    dispatch(showInfoMessage({ message: "Copied.", duration: 2500 }));
  };

  useEffect(() => {
    validateDni();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>
            <h5>{title}</h5>
          </span>
          <span>
            <span onClick={validateDni} title="Validate DNI">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.5 11.5 11 14l4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
              </svg>
            </span>
            <span onClick={handleCopyClick}>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clipRule="evenodd"/>
                <path fillRule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clipRule="evenodd"/>
              </svg>
            </span>
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="card-body-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
