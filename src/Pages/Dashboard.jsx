import React from 'react';
import { FaCalendarCheck, FaTrophy, FaRegClock } from 'react-icons/fa';
import './Dashboard.css';

const Dashboard = ({ habits, goals }) => {
  const completedHabits = habits.filter(habit => habit.status === 'Completed').length;
  const completedGoals = goals.filter(goal => goal.status === 'Completed').length;
  const streak = calculateStreak(habits);
  
  // Get today's habits
  const today = new Date();
  const todayHabits = habits.filter(habit => {
    const habitDate = new Date(habit.date);
    return (
      habitDate.getDate() === today.getDate() &&
      habitDate.getMonth() === today.getMonth() &&
      habitDate.getFullYear() === today.getFullYear()
    );
  });

  // Get upcoming habits (next 7 days)
  const upcomingHabits = habits.filter(habit => {
    const habitDate = new Date(habit.date);
    const nowDate = new Date();
    const weekFromNow = new Date();
    weekFromNow.setDate(weekFromNow.getDate() + 7);
    
    return habitDate > nowDate && habitDate <= weekFromNow;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  function calculateStreak(habits) {
    // This is a simplified streak calculation
    // A real one would need to account for daily habits specifically
    return Math.floor(completedHabits / 2);
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">
            <FaCalendarCheck />
          </div>
          <div className="stat-info">
            <h3>Completed Habits</h3>
            <p className="stat-value">{completedHabits}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaTrophy />
          </div>
          <div className="stat-info">
            <h3>Completed Goals</h3>
            <p className="stat-value">{completedGoals}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <FaRegClock />
          </div>
          <div className="stat-info">
            <h3>Current Streak</h3>
            <p className="stat-value">{streak} days</p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content">
        <div className="today-habits">
          <h2>Today's Habits</h2>
          {todayHabits.length === 0 ? (
            <p className="empty-message">No habits scheduled for today</p>
          ) : (
            <ul className="habit-list">
              {todayHabits.map((habit, index) => (
                <li key={index} className="habit-item">
                  <div className="habit-color" style={{ backgroundColor: habit.color }}></div>
                  <div className="habit-details">
                    <h3>{habit.title}</h3>
                    <p>{habit.time ? new Date(`2022-01-01T${habit.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'All day'}</p>
                  </div>
                  <div className="habit-status">
                    <span className={`status-badge ${habit.status.toLowerCase().replace(' ', '-')}`}>
                      {habit.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="upcoming-habits">
          <h2>Upcoming Habits</h2>
          {upcomingHabits.length === 0 ? (
            <p className="empty-message">No upcoming habits for the next week</p>
          ) : (
            <ul className="habit-list">
              {upcomingHabits.map((habit, index) => (
                <li key={index} className="habit-item">
                  <div className="habit-color" style={{ backgroundColor: habit.color }}></div>
                  <div className="habit-details">
                    <h3>{habit.title}</h3>
                    <p>
                      {new Date(habit.date).toLocaleDateString()} 
                      {habit.time ? ` at ${new Date(`2022-01-01T${habit.time}`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : ''}
                    </p>
                  </div>
                  <div className="habit-status">
                    <span className={`status-badge ${habit.status.toLowerCase().replace(' ', '-')}`}>
                      {habit.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
