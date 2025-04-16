import React from 'react';
import { IoNotificationsOutline, IoSettingsOutline, IoSearchOutline } from 'react-icons/io5';
import './TopNavbar.css';

const TopNavbar = () => {
  return (
    <div className="top-navbar">
      <div className="platform-branding">
        <div className="platform-logo">
          <span>🌱</span>
        </div>
        <h1 className="platform-name">HabitFlow</h1>
      </div>
      
      <div className="navbar-search">
        <IoSearchOutline className="search-icon" />
        <input 
          type="text" 
          placeholder="Search habits, goals..." 
          className="search-input"
        />
      </div>
      
      <div className="navbar-actions">
        <button className="action-button">
          <IoNotificationsOutline />
        </button>
        <button className="action-button">
          <IoSettingsOutline />
        </button>
        <div className="user-profile">
          <div className="avatar-circle">U</div>
          <span className="username">Username</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;