import React, { useState, useEffect } from 'react';
import './HabitForm.css';

const HabitForm = ({ addHabit, onClose, selectedDate }) => {
  const [habitData, setHabitData] = useState({
    title: '',
    startDate: selectedDate ? selectedDate.toISOString().split('T')[0] : '',
    endDate: '',
    time: '12:00',
    category: 'General Habit',
    status: 'Pending',
    description: '',
    reminder: {
      enabled: false,
      frequency: 'daily',
      customHours: 1
    }
  });

  // Time state to handle hours and minutes separately for better control
  const [timeState, setTimeState] = useState({
    hours: '12',
    minutes: '00',
    period: 'AM'
  });

  useEffect(() => {
    if (selectedDate) {
      setHabitData(prev => ({
        ...prev,
        startDate: selectedDate.toISOString().split('T')[0]
      }));
    }
    
    // Initialize time state if habitData.time exists
    if (habitData.time) {
      const timeComponents = parseTimeString(habitData.time);
      setTimeState(timeComponents);
    }
  }, [selectedDate]);

  // Parse time string (e.g., "12:30 PM") into components
  const parseTimeString = (timeStr) => {
    if (!timeStr) return { hours: '12', minutes: '00', period: 'AM' };
    
    try {
      const [time, period] = timeStr.split(' ');
      const [hours, minutes] = time.split(':');
      return {
        hours: hours || '12',
        minutes: minutes || '00',
        period: period || 'AM'
      };
    } catch (e) {
      return { hours: '12', minutes: '00', period: 'AM' };
    }
  };

  // Update the time in habitData whenever timeState changes
  useEffect(() => {
    const formattedTime = `${timeState.hours}:${timeState.minutes} ${timeState.period}`;
    setHabitData(prev => ({
      ...prev,
      time: formattedTime
    }));
  }, [timeState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHabitData({
      ...habitData,
      [name]: value
    });
  };

  // Handle changes to the time components
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'hours') {
      // Ensure hours are between 1-12
      let hours = parseInt(value);
      if (isNaN(hours) || hours < 1) hours = 1;
      if (hours > 12) hours = 12;
      setTimeState({
        ...timeState,
        hours: hours.toString().padStart(2, '0')
      });
    } 
    else if (name === 'minutes') {
      // Ensure minutes are between 0-59
      let minutes = parseInt(value);
      if (isNaN(minutes) || minutes < 0) minutes = 0;
      if (minutes > 59) minutes = 59;
      setTimeState({
        ...timeState,
        minutes: minutes.toString().padStart(2, '0')
      });
    }
    else if (name === 'period') {
      setTimeState({
        ...timeState,
        period: value
      });
    }
  };

  // Handle reminder changes
  const handleReminderChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setHabitData(prev => ({
      ...prev,
      reminder: {
        ...prev.reminder,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };

  // Handle custom hours input for reminders
  const handleCustomHoursChange = (e) => {
    const value = parseInt(e.target.value);
    if (isNaN(value) || value < 1) return;
    
    setHabitData(prev => ({
      ...prev,
      reminder: {
        ...prev.reminder,
        customHours: value
      }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!habitData.startDate || !habitData.endDate) {
      alert('Please select a valid date range for your habit');
      return;
    }

    if (new Date(habitData.startDate) > new Date(habitData.endDate)) {
      alert('End date cannot be earlier than start date');
      return;
    }

    const newHabit = {
      ...habitData,
      id: Date.now().toString()
    };

    addHabit(newHabit);
    onClose && onClose();
  };

  return (
    <div className="habit-form">
      <h2>Create Habit</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="habit-title">Habit Title</label>
          <input
            type="text"
            id="habit-title"
            name="title"
            value={habitData.title}
            onChange={handleChange}
            placeholder="What habit do you want to build?"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="habit-start-date">Start Date</label>
          <input
            type="date"
            id="habit-start-date"
            name="startDate"
            value={habitData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="habit-end-date">End Date</label>
          <input
            type="date"
            id="habit-end-date"
            name="endDate"
            value={habitData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="habit-time">Time</label>
          <div className="custom-time-picker">
            <input
              type="number"
              name="hours"
              min="1"
              max="12"
              value={timeState.hours}
              onChange={handleTimeChange}
              className="time-input hours"
            />
            <span className="time-separator">:</span>
            <input
              type="number"
              name="minutes"
              min="0"
              max="59"
              value={timeState.minutes}
              onChange={handleTimeChange}
              className="time-input minutes"
            />
            <select
              name="period"
              value={timeState.period}
              onChange={handleTimeChange}
              className="time-period"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="habit-category">Category</label>
          <select
            id="habit-category"
            name="category"
            value={habitData.category}
            onChange={handleChange}
          >
            <option value="General Habit">General Habit</option>
            <option value="Health">Health</option>
            <option value="Fitness">Fitness</option>
            <option value="Learning">Learning</option>
            <option value="Productivity">Productivity</option>
            <option value="Mindfulness">Mindfulness</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="habit-status">Status</label>
          <select
            id="habit-status"
            name="status"
            value={habitData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Reminder Section */}
        <div className="form-group reminder-section">
          <div className="reminder-header">
            <label className="reminder-label">
              <input
                type="checkbox"
                name="enabled"
                checked={habitData.reminder.enabled}
                onChange={handleReminderChange}
                className="reminder-checkbox"
              />
              Set Reminder
            </label>
          </div>
          
          {habitData.reminder.enabled && (
            <div className="reminder-options">
              <div className="reminder-frequency">
                <label htmlFor="reminder-frequency">Remind me:</label>
                <select
                  id="reminder-frequency"
                  name="frequency"
                  value={habitData.reminder.frequency}
                  onChange={handleReminderChange}
                  className="reminder-select"
                >
                  <option value="daily">Daily</option>
                  <option value="hourly">Every few hours</option>
                  <option value="weekly">Weekly</option>
                </select>
              </div>
              
              {habitData.reminder.frequency === 'hourly' && (
                <div className="custom-hours-container">
                  <label htmlFor="custom-hours">Every</label>
                  <input
                    type="number"
                    id="custom-hours"
                    min="1"
                    max="24"
                    value={habitData.reminder.customHours}
                    onChange={handleCustomHoursChange}
                    className="custom-hours-input"
                  />
                  <span>hour(s)</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="habit-description">Description (Optional)</label>
          <textarea
            id="habit-description"
            name="description"
            value={habitData.description}
            onChange={handleChange}
            placeholder="Add details about your habit"
          />
        </div>

        <div className="form-buttons">
          <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-create">Create New Habit</button>
        </div>
      </form>
    </div>
  );
};

export default HabitForm;