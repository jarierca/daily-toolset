import React, { useState, useEffect, useCallback } from 'react';
import './Calendar.css';

const Calendar = () => {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState([]);
  const [selectedDay, setSelectedDay] = useState(new Date().getDate());
  const [selectedNotes, setSelectedNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(storedNotes);
  }, []);

  const getNotesForDay = useCallback((day) => {
    return notes.filter(note => {
      if (note.dueDate) {
        const noteDate = new Date(note.dueDate);
        return (
          noteDate.getDate() === day &&
          noteDate.getMonth() === date.getMonth() &&
          noteDate.getFullYear() === date.getFullYear()
        );
      }
      return false;
    });
  }, [notes, date]);

  const handleDayClick = useCallback((day) => {
    const notesForDay = getNotesForDay(day);
    setSelectedNotes(notesForDay);
    setSelectedDay(day);
    setSelectedNote(null);
  }, [getNotesForDay]);

  useEffect(() => {
    handleDayClick(new Date().getDate());
  }, [handleDayClick]);

  const allNotesCompleted = useCallback((day) => {
    const notesForDay = getNotesForDay(day);
    if (notesForDay.length === 0) {
      return false;
    }
    return notesForDay.every(note => note.completed);
  }, [getNotesForDay]);

  const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  return (
    <div className="calendar-container">
      <div className="calendar">
        <div className="calendar-header">
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() - 1, 1))}>&lt;</button>
          <h2>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
          <button onClick={() => setDate(new Date(date.getFullYear(), date.getMonth() + 1, 1))}>&gt;</button>
        </div>
        <br />
        <div className="calendar-body">
          <div className="week-days">
            {weekDays.map(day => (
              <div key={day}>{day}</div>
            ))}
          </div>
          <div className="days-grid">
            {Array.from({ length: firstDayOfMonth }, (_, i) => (
              <div key={`empty-${i}`} className="empty-day"></div>
            ))}
            {days.map(day => {
              const notesForDay = getNotesForDay(day);
              const allCompleted = allNotesCompleted(day);
              const isSelected = day === selectedDay;

              let dayClass = 'calendar-day';
              if (notesForDay.length > 0) {
                if (allCompleted) {
                  dayClass += ' all-completed';
                } else {
                  dayClass += ' not-completed';
                }
              }
              if (isSelected) {
                dayClass += ' selected';
              }

              return (
                <div key={day} className={dayClass} onClick={() => handleDayClick(day)}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="notes-container">
        {selectedNotes.length > 0 ? (
          <div className="notes-group">
            <div className="notes-title">
              <h3>Notes for {selectedDay}/{date.getMonth() + 1}/{date.getFullYear()}:</h3>
            </div>
            <div className="notes-summary">
              <ul>
                {selectedNotes.map((note, index) => (
                  <li key={index} onClick={() => setSelectedNote(note)} className={note === selectedNote ? 'selected' : ''}>
                    <span className={note.completed ? 'completed' : ''}>{note.title}</span> <br />
                    {note.createdAt} <br />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <span className="no-notes mx-3">
            <h3>Notes for {selectedDay}/{date.getMonth() + 1}/{date.getFullYear()}:</h3>
            <p>No notes for this day.</p>
          </span>
        )}
        {selectedNote && (
          <div className="note-description">
            <strong>Title:</strong> {selectedNote.title} <br />
            <strong>Created At:</strong> {selectedNote.createdAt} <br />
            <strong>Description:</strong> {selectedNote.description} <br />
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;

