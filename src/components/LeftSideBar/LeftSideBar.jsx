import React from 'react';
import { 
  IoHomeOutline, IoCalendarOutline, IoStatsChartOutline, 
  IoPeopleOutline, IoSettingsOutline, IoChevronBackOutline,
  IoChevronForwardOutline, IoTrophyOutline, IoChatbubbleEllipsesOutline
} from 'react-icons/io5';
import './LeftSidebar.css';

const LeftSidebar = ({ isCollapsed, toggleCollapse }) => {
  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="collapse-button" onClick={toggleCollapse}>
        {isCollapsed ? <IoChevronForwardOutline /> : <IoChevronBackOutline />}
      </div>
      
      <div className="nav-item">
        <IoHomeOutline className="nav-icon" />
        <span className="nav-text">Dashboard</span>
      </div>
      
      <div className="nav-item selected">
        <IoCalendarOutline className="nav-icon" />
        <span className="nav-text">Calendar</span>
      </div>
      
      <div className="nav-item">
        <IoChatbubbleEllipsesOutline className="nav-icon" />
        <span className="nav-text">Ava</span>
      </div>
      
      <div className="nav-item">
        <IoTrophyOutline className="nav-icon" />
        <span className="nav-text">Goals</span>
      </div>
      
      <div className="nav-item">
        <IoStatsChartOutline className="nav-icon" />
        <span className="nav-text">Analytics</span>
      </div>
      
      <div className="nav-item">
        <IoPeopleOutline className="nav-icon" />
        <span className="nav-text">Community</span>
      </div>
      
      <div className="sidebar-spacer"></div>
      
      <div className="nav-item">
        <IoSettingsOutline className="nav-icon" />
        <span className="nav-text">Settings</span>
      </div>
      
      <div className="sidebar-footer">
        <div className="avatar-circle">U</div>
        <span className="user-name">Username</span>
      </div>
    </div>
  );
};

export default LeftSidebar;

