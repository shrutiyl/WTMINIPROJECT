import React, { useState, useEffect } from 'react';
import { 
  IoTimeOutline, IoCheckmarkCircleOutline, 
  IoFitnessOutline, IoWaterOutline, IoBookOutline, 
  IoAlarmOutline, IoPeopleOutline, IoCheckmarkCircle,
  IoEllipseOutline, IoCheckmarkDoneCircleOutline
} from 'react-icons/io5';
import './RightSidebar.css';

const RightSidebar = ({ 
  selectedDate,
  formatDateForInput,
  addEvent,
  events,
  toggleEventStatus,
  getCategoryColor
}) => {
  const [habitForm, setHabitForm] = useState({
    title: '',
    date: '',
    time: '',
    category: 'general',
    status: 'Pending',
    description: ''
  });

  // Update form date when selected date changes
  useEffect(() => {
    if (selectedDate) {
      setHabitForm(prev => ({
        ...prev,
        date: formatDateForInput(selectedDate)
      }));
    }
  }, [selectedDate, formatDateForInput]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setHabitForm({
      ...habitForm,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create new habit
    const newHabit = {
      id: Date.now(), // Simple unique ID
      title: habitForm.title,
      date: new Date(habitForm.date),
      time: habitForm.time || '00:00',
      category: habitForm.category,
      completed: habitForm.status === 'Completed',
      color: getCategoryColor(habitForm.category),
      description: habitForm.description
    };
    
    // Add new habit
    addEvent(newHabit);
    
    // Reset form (keeping the selected date)
    setHabitForm({
      title: '',
      date: selectedDate ? formatDateForInput(selectedDate) : '',
      time: '',
      category: 'general',
      status: 'Pending',
      description: ''
    });
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'fitness':
        return <IoFitnessOutline />;
      case 'health':
        return <IoWaterOutline />;
      case 'learning':
        return <IoBookOutline />;
      case 'work':
        return <IoAlarmOutline />;
      case 'social':
        return <IoPeopleOutline />;
      default:
        return <IoCheckmarkCircleOutline />;
    }
  };

  return (
    <div className="habit-sidebar">
      <h2 className="sidebar-title">Create Habit</h2>
      
      {selectedDate && (
        <div className="selected-date">
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="habit-form">
        <div className="form-group">
          <label>Habit Title</label>
          <input 
            type="text" 
            name="title" 
            value={habitForm.title} 
            onChange={handleInputChange} 
            placeholder="What habit do you want to build?" 
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            name="date" 
            value={habitForm.date} 
            onChange={handleInputChange} 
            required
            className="form-input"
          />
        </div>
        
        <div className="form-group">
          <label>Time</label>
          <input 
            type="time" 
            name="time" 
            value={habitForm.time} 
            onChange={handleInputChange}
            className="form-input" 
          />
        </div>
        
        <div className="form-group">
          <label>Category</label>
          <select 
            name="category" 
            value={habitForm.category} 
            onChange={handleInputChange}
            className="form-select"
          >
            <option value="general">⚪ General Habit</option>
            <option value="work">💼 Work/Productivity</option>
            <option value="fitness">💪 Fitness</option>
            <option value="health">💧 Health & Wellness</option>
            <option value="learning">📚 Learning</option>
            <option value="social">👥 Social</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Status</label>
          <select 
            name="status" 
            value={habitForm.status} 
            onChange={handleInputChange}
            className="form-select"
          >
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Description (Optional)</label>
          <textarea 
            name="description" 
            value={habitForm.description} 
            onChange={handleInputChange} 
            placeholder="Add details about your habit"
            rows="3"
            className="form-textarea"
          ></textarea>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="save-btn">Save Habit</button>
          <button 
            type="button" 
            className="cancel-btn"
            onClick={() => {
              setHabitForm({
                title: '',
                date: selectedDate ? formatDateForInput(selectedDate) : '',
                time: '',
                category: 'general',
                status: 'Pending',
                description: ''
              });
            }}
          >
            Cancel
          </button>
        </div>
      </form>
      
      {events.length > 0 && (
        <div className="habits-for-day">
          <h3 className="habits-title">
            Habits for {selectedDate?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
          </h3>
          
          <div className="habits-list">
            {events.map(habit => (
              <div 
                key={habit.id}
                className={`habit-card ${habit.completed ? 'completed' : ''}`}
              >
                <div className="habit-card-header" style={{ borderLeftColor: habit.color }}>
                  <div className="habit-card-icon">
                    {getCategoryIcon(habit.category)}
                  </div>
                  <div className="habit-card-time">
                    <IoTimeOutline />
                    <span>{habit.time}</span>
                  </div>
                </div>
                
                <div className="habit-card-title">{habit.title}</div>
                
                {habit.description && (
                  <div className="habit-card-description">{habit.description}</div>
                )}
                
                <div 
                  className="habit-card-status"
                  onClick={() => toggleEventStatus(habit.id)}
                >
                  {habit.completed ? (
                    <>
                      <div className="status-checkbox checked">
                        <IoCheckmarkDoneCircleOutline className="completed-icon" />
                      </div>
                      <span className="status-text completed">Completed</span>
                    </>
                  ) : (
                    <>
                      <div className="status-checkbox">
                        <IoEllipseOutline className="pending-icon" />
                      </div>
                      <span className="status-text">Mark as completed</span>
                    </>
                  )}
                </div>
                
                <div className="streak-indicator">
                  <span className="streak-count">🔥 3 day streak</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {events.length === 0 && selectedDate && (
        <div className="no-habits-message">
          <p>No habits scheduled for this day.</p>
          <p>Create a new habit to start building consistency!</p>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;