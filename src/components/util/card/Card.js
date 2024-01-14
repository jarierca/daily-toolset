import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { showInfoMessage } from "../../../redux/actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
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
    <div className="card m-3 my-card">
      <div className="card-header">
        <div className="card-title my-card-title">
          <span>
            <h5 style={{ marginBottom: "0.5rem" }}>{title}</h5>
          </span>
          <span>
            <FontAwesomeIcon
              icon={faArrowsRotate}
              onClick={onRefresh}
              className="font-icon"
            />
            <FontAwesomeIcon
              icon={faCopy}
              onClick={handleCopyClick}
              className="font-icon"
            />
          </span>
        </div>
      </div>
      <div className="card-body">
        <div className="children-content" onClick={handleCopyClick}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Card;
