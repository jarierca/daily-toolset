// src/pages/Tasks.js
import React from 'react';
import { Link } from "react-router-dom";


const Tasks = () => {

  return (
    <div className="container">
      <div className="btn-row btn-center mt-5">
        <Link to="/tasks/toDoList" className="btn btn-outline-secondary" title="Home" aria-label="home">
          <h3>To Do List</h3>
        </Link>
        <Link to="/tasks/notes" className="btn btn-outline-secondary mx-3" title="Home" aria-label="home">
          <h3>Notes</h3>
        </Link>
        <Link to="/tasks/calendar" className="btn btn-outline-secondary" title="Home" aria-label="home">
          <h3>Calendar</h3>
        </Link>
      </div>
    </div>
  );
};
export default Tasks;
