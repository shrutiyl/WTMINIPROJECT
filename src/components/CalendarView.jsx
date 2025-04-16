import React, { useState, useEffect } from 'react';
import './CalendarView.css';

const CalendarView = ({ habits, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();
    
    let days = [];
    
    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      days.push({
        day: prevMonthDays - i,
        month: currentMonth - 1,
        year: currentMonth === 0 ? currentYear - 1 : currentYear,
        isCurrentMonth: false
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        month: currentMonth,
        year: currentYear,
        isCurrentMonth: true
      });
    }
    
    // Calculate remaining cells to fill out the grid
    const remainingCells = 42 - days.length;
    
    // Next month days
    for (let i = 1; i <= remainingCells; i++) {
      days.push({
        day: i,
        month: currentMonth + 1,
        year: currentMonth === 11 ? currentYear + 1 : currentYear,
        isCurrentMonth: false
      });
    }
    
    return days;
  };

  const navigateMonth = (direction) => {
    if (direction === 'prev') {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    } else {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    }
  };

  const getHabitsForDate = (day, month, year) => {
    return habits.filter(habit => {
      const habitDate = new Date(habit.date);
      return (
        habitDate.getDate() === day &&
        habitDate.getMonth() === month &&
        habitDate.getFullYear() === year
      );
    });
  };

  const getEventColor = (habit) => {
    return habit.status === 'completed' ? '#4caf50' : '#ff9800';
  };

  const days = generateCalendar();

  return (
    <div className="calendar-view">
      <div className="calendar-header">
        <button className="nav-btn" onClick={() => navigateMonth('prev')}>
          &lt;
        </button>
        <h2>{months[currentMonth]} {currentYear}</h2>
        <button className="nav-btn" onClick={() => navigateMonth('next')}>
          &gt;
        </button>
      </div>
      
      <div className="calendar-days">
        {daysOfWeek.map(day => (
          <div key={day} className="day-header">{day}</div>
        ))}
        
        {days.map((day, index) => {
          const dateHabits = getHabitsForDate(day.day, day.month, day.year);
          const isToday = 
            day.day === new Date().getDate() && 
            day.month === new Date().getMonth() && 
            day.year === new Date().getFullYear();
            
          return (
            <div 
              key={index} 
              className={`calendar-day ${!day.isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
              onClick={() => onDateClick(day.day, day.month, day.year)}
            >
              <div className="day-number">{day.day}</div>
              <div className="day-events">
                {dateHabits.slice(0, 3).map((habit, i) => (
                  <div 
                    key={i} 
                    className="event-pill"
                    style={{ backgroundColor: getEventColor(habit) }}
                  >
                    {habit.time && <span className="event-time">
                      {new Date(`2022-01-01T${habit.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>}
                    <span className="event-title">{habit.title}</span>
                  </div>
                ))}
                {dateHabits.length > 3 && (
                  <div className="more-events">+{dateHabits.length - 3} more</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;