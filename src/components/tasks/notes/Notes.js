import React, { useState, useEffect } from 'react';
import './Notes.css'; 

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [selectedNoteIndex, setSelectedNoteIndex] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [createdAt, setCreatedAt] = useState('');
  const [completed, setCompleted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem('notes', JSON.stringify(notes));
    }
  }, [notes]);

  const handleAddNote = () => {
    const currentDate = new Date();
    const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
    const newNote = { 
      title: 'New Note', 
      description: '', 
      dueDate: '', 
      createdAt: formattedDate,
      completed: false
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setSelectedNoteIndex(updatedNotes.length - 1);
    setTitle(newNote.title);
    setDescription(newNote.description);
    setDueDate(newNote.dueDate);
    setCreatedAt(newNote.createdAt);
    setCompleted(newNote.completed);
  };

  const handleSelectNote = (index) => {
    setSelectedNoteIndex(index);
    setTitle(notes[index].title);
    setDescription(notes[index].description);
    setDueDate(notes[index].dueDate);
    setCreatedAt(notes[index].createdAt);
    setCompleted(notes[index].completed);
  };

  const handleSaveNote = () => {
    if (selectedNoteIndex !== null) {
      const updatedNotes = notes.map((note, index) =>
        index === selectedNoteIndex ? { ...note, title, description, dueDate, completed } : note
      );
      setNotes(updatedNotes);
      setCreatedAt(updatedNotes[selectedNoteIndex].createdAt);
    }
  };

  const handleDeleteNote = (index) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this note?');
    if (confirmDelete) {
      const updatedNotes = notes.filter((_, i) => i !== index);
      setNotes(updatedNotes);
      setSelectedNoteIndex(null);
      setTitle('');
      setDescription('');
      setDueDate('');
      setCreatedAt('');
      setCompleted(false);
    }
  };

  const handleDeleteAllNotes = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete all notes?');
    if (confirmDelete) {
      setNotes([]);
      setSelectedNoteIndex(null);
      setTitle('');
      setDescription('');
      setDueDate('');
      setCreatedAt('');
      setCompleted(false);
    }
  };

const filteredNotes = notes.filter((note) => {
  const normalizedSearchTerm = searchTerm.toLowerCase();
  const normalizedTitle = note.title.toLowerCase();
  const normalizedCreatedAt = note.createdAt.toLowerCase();
  const normalizedCompleted = note.completed ? 'completed' : 'uncompleted';

  const isCompletedSearch = normalizedSearchTerm === 'completed';
  const isUncompletedSearch = normalizedSearchTerm === 'uncompleted';

  return (
    normalizedTitle.includes(normalizedSearchTerm) ||
    normalizedCreatedAt.includes(normalizedSearchTerm) ||
    (isCompletedSearch && normalizedCompleted === 'completed') ||
    (isUncompletedSearch && normalizedCompleted === 'uncompleted')
  );
});



  return (
    <div className="notes-app">
      <div className="sidebar">

        <input type="text" className="inpt-txt filter-notes" placeholder="Search by title, date or status..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        
        <div className="btn-row">
          <button className="btn btn-outline-secondary add-note mb-4" onClick={handleAddNote}>Add Note</button>
          <button className="btn-icon btn-outline-secondary mb-4 ml-3" onClick={handleDeleteAllNotes} title="Delete All Notes">
            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
            </svg>
          </button>
        </div>

        <ul>
          {filteredNotes.map((note, index) => {
            const formattedDueDate = note.dueDate ? `${new Date(note.dueDate).toLocaleDateString()} ${new Date(note.dueDate).toLocaleTimeString()}` : '';
            return(
              <li key={index} onClick={() => handleSelectNote(index)} className={`${index === selectedNoteIndex ? 'selected' : ''} ${note.completed ? 'completed' : ''}`} >
                <div>
                  <strong>{note.title}</strong>
                  <br />
                  <small>{formattedDueDate}</small>
                </div>
                <span title="Clear Note" onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNote(index);
                  }} >
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd"/>
                  </svg>
                </span>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="main">
        {selectedNoteIndex !== null ? (
          <div>
            <div className="btn-row form-header-group">
              <span className="btn-row">
                <button className="btn-icon btn-outline-secondary mb-4" onClick={handleSaveNote}>Save</button>
                <input type="checkbox" className="mx-3" checked={completed} onChange={(e) => setCompleted(e.target.checked)} title="Completed" /> 
                Completed
              </span>
              <small className="ml-3"> CreatedAt {createdAt}</small>
            </div>
            <div className="btn-row">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Note Title" />
              <input type="date" className="ml-3" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            </div>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Note Description" 
              rows="25"/>

          </div>
        ) : (
          <p>Select a note to view/edit</p>
        )}
      </div>
    </div>
  );
};

export default Notes;

