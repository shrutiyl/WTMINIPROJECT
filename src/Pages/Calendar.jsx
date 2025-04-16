import React, { useState } from 'react';
import CalendarView from '../components/CalendarView';
import HabitForm from '../components/HabitForm';
import './Calendar.css';

const Calendar = ({ habits, addHabit }) => {
  const [showHabitForm, setShowHabitForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  
  const handleDateClick = (day, month, year) => {
    setSelectedDate(new Date(year, month, day));
    setShowHabitForm(true);
  };

  const handleHabitFormClose = () => {
    setShowHabitForm(false);
    setSelectedDate(null);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-top-header">
        <h1>Habit Calendar</h1>
        <button className="btn-create" onClick={() => setShowHabitForm(true)}>Create New Habit</button>
      </div>
      
      <div className="calendar-content">
        <CalendarView 
          habits={habits} 
          onDateClick={handleDateClick}
        />
        
        {showHabitForm && (
          <div className="habit-form-modal">
            <div className="modal-overlay" onClick={handleHabitFormClose}></div>
            <div className="modal-content">
              <button className="close-btn" onClick={handleHabitFormClose}>×</button>
              <HabitForm 
                addHabit={addHabit}
                onClose={handleHabitFormClose}
                selectedDate={selectedDate}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;