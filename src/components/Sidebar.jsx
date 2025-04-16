import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaRobot, 
  FaTrophy, 
  FaChartBar, 
  FaUsers, 
  FaCog, 
  FaUser 
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="logo-icon">🌱</span>
        <h1>HabitFlow</h1>
      </div>
      
      <nav className="nav-menu">
        <NavLink to="/" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaHome className="nav-icon" />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/calendar" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaCalendarAlt className="nav-icon" />
          <span>Calendar</span>
        </NavLink>
        
        <NavLink to="/ava" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaRobot className="nav-icon" />
          <span>Ava</span>
        </NavLink>
        
        <NavLink to="/goals" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaTrophy className="nav-icon" />
          <span>Goals</span>
        </NavLink>
        
        <NavLink to="/analytics" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaChartBar className="nav-icon" />
          <span>Analytics</span>
        </NavLink>
        
        <NavLink to="/community" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaUsers className="nav-icon" />
          <span>Community</span>
        </NavLink>
        
        <NavLink to="/settings" className={({isActive}) => isActive ? 'nav-item active' : 'nav-item'}>
          <FaCog className="nav-icon" />
          <span>Settings</span>
        </NavLink>
      </nav>
      
      <div className="user-profile">
        <div className="avatar">
          <FaUser />
        </div>
        <span className="username">Username</span>
      </div>
    </div>
  );
};

export default Sidebar;