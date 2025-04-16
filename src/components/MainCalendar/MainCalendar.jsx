import React, { useEffect, useRef } from 'react';
import { 
  IoChevronBackOutline, IoChevronForwardOutline,
  IoCheckmarkCircle, IoEllipseOutline
} from 'react-icons/io5';
import './MainCalendar.css';

const MainCalendar = ({ 
  events, 
  currentMonth, 
  currentYear, 
  selectedDate,
  setCurrentMonth,
  setCurrentYear,
  setSelectedDate, 
  toggleEventStatus
}) => {
  const calendarRef = useRef(null);

  // Generate calendar days
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(event.date, date));
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    
    // Create array of days in previous month needed to fill first row
    const prevMonthDays = [];
    if (firstDay > 0) {
      const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const prevMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const daysInPrevMonth = getDaysInMonth(prevMonth, prevMonthYear);
      
      for (let i = 0; i < firstDay; i++) {
        const day = daysInPrevMonth - (firstDay - i - 1);
        const date = new Date(prevMonthYear, prevMonth, day);
        
        prevMonthDays.push(
          <div key={`prev-${day}`} className="calendar-day prev-month">
            <span className="day-number">{day}</span>
            <div className="day-events"></div>
          </div>
        );
      }
    }

    // Current month days
    const currentMonthDays = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const today = new Date();
      const isToday = today.getDate() === day && 
                      today.getMonth() === currentMonth && 
                      today.getFullYear() === currentYear;
      const isSelected = selectedDate && isSameDay(selectedDate, date);
      const dayEvents = getEventsForDate(date);
      
      currentMonthDays.push(
        <div 
          key={`day-${day}`} 
          className={`calendar-day ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          <span className="day-number">{day}</span>
          
          <div className="day-events">
            {dayEvents.slice(0, 3).map(event => (
              <div 
                key={event.id}
                className={`habit-pill ${event.completed ? 'completed' : 'pending'}`}
                style={{ backgroundColor: event.color }}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleEventStatus(event.id);
                }}
              >
                <span className="habit-status-icon">
                  {event.completed ? (
                    <IoCheckmarkCircle className="status-icon completed" />
                  ) : (
                    <IoEllipseOutline className="status-icon pending" />
                  )}
                </span>
                <span className="habit-time">{event.time}</span>
                <span className="habit-title">{event.title}</span>
              </div>
            ))}
            
            {dayEvents.length > 3 && (
              <div className="more-habits">+{dayEvents.length - 3} more</div>
            )}
          </div>
        </div>
      );
    }

    // Calculate how many days from next month are needed to complete the grid
    const totalDaysShown = prevMonthDays.length + currentMonthDays.length;
    const daysToAdd = (Math.ceil(totalDaysShown / 7) * 7) - totalDaysShown;
    
    const nextMonthDays = [];
    if (daysToAdd > 0) {
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;
      
      for (let day = 1; day <= daysToAdd; day++) {
        const date = new Date(nextMonthYear, nextMonth, day);
        
        nextMonthDays.push(
          <div key={`next-${day}`} className="calendar-day next-month">
            <span className="day-number">{day}</span>
            <div className="day-events"></div>
          </div>
        );
      }
    }

    return [...prevMonthDays, ...currentMonthDays, ...nextMonthDays];
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
    
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="main-content" ref={calendarRef}>
      <div className="calendar-container">
        <div className="calendar-header">
          <div className="month-navigation">
            <button className="nav-button" onClick={prevMonth}>
              <IoChevronBackOutline />
            </button>
            <h2 className="current-month">{monthNames[currentMonth]} {currentYear}</h2>
            <button className="nav-button" onClick={nextMonth}>
              <IoChevronForwardOutline />
            </button>
          </div>
          <button className="create-habit-btn">Create New Habit</button>
        </div>

        <div className="calendar-outer-wrapper">
          <div className="calendar-grid">
            <div className="weekdays">
              {dayNames.map(day => (
                <div key={day} className="weekday-name">{day}</div>
              ))}
            </div>
            <div className="days-grid">
              {generateCalendarDays()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCalendar;