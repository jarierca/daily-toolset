import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../../redux/Actions";
import "./Card.css";

const Card = ({ title, children, onRefresh }) => {
  const dispatch = useDispatch();

  const handleCopyClick = () => {
    navigator.clipboard.writeText(children);
    dispatch(showInfoMessage({ message: "COPIADO.", duration: 2500 }));
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        <div className="card-title">
          <span>
            <h5>{title}</h5>
          </span>
          <span>
            <span onClick={onRefresh}>
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
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
        <div className="card-body-content" onClick={handleCopyClick}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
