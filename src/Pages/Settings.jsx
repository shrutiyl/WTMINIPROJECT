import React, { useState } from 'react';
import { FaUser, FaBell, FaPalette, FaShieldAlt, FaQuestionCircle } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [theme, setTheme] = useState('dark');
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    reminders: true
  });
  
  const handleNotificationChange = (setting) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: !notificationSettings[setting]
    });
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-container">
        <div className="settings-sidebar">
          <button 
            className={`settings-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <FaUser className="tab-icon" />
            <span>Profile</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveTab('notifications')}
          >
            <FaBell className="tab-icon" />
            <span>Notifications</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'appearance' ? 'active' : ''}`}
            onClick={() => setActiveTab('appearance')}
          >
            <FaPalette className="tab-icon" />
            <span>Appearance</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'privacy' ? 'active' : ''}`}
            onClick={() => setActiveTab('privacy')}
          >
            <FaShieldAlt className="tab-icon" />
            <span>Privacy & Security</span>
          </button>
          
          <button 
            className={`settings-tab ${activeTab === 'help' ? 'active' : ''}`}
            onClick={() => setActiveTab('help')}
          >
            <FaQuestionCircle className="tab-icon" />
            <span>Help & Support</span>
          </button>
        </div>
        
        <div className="settings-content">
          {activeTab === 'profile' && (
            <div className="settings-section">
              <h2>Profile Settings</h2>
              
              <div className="profile-settings">
                <div className="avatar-section">
                  <div className="avatar-preview">U</div>
                  <button className="btn-upload">Upload Photo</button>
                </div>
                
                <div className="form-group">
                  <label>Username</label>
                  <input type="text" defaultValue="Username" />
                </div>
                
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" defaultValue="user@example.com" />
                </div>
                
                <div className="form-group">
                  <label>Bio</label>
                  <textarea defaultValue="I'm focused on building healthy habits and reaching my goals." />
                </div>
                
                <button className="btn-save">Save Changes</button>
              </div>
            </div>
          )}
          
          {activeTab === 'notifications' && (
            <div className="settings-section">
              <h2>Notification Settings</h2>
              
              <div className="notification-settings">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <h3>Email Notifications</h3>
                    <p>Receive reminders and updates via email</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.email}
                      onChange={() => handleNotificationChange('email')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <h3>Push Notifications</h3>
                    <p>Receive alerts on your device</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.push}
                      onChange={() => handleNotificationChange('push')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <h3>Habit Reminders</h3>
                    <p>Get reminded before your scheduled habits</p>
                  </div>
                  <label className="switch">
                    <input 
                      type="checkbox" 
                      checked={notificationSettings.reminders}
                      onChange={() => handleNotificationChange('reminders')}
                    />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="form-group">
                  <label>Reminder Time</label>
                  <select defaultValue="15">
                    <option value="5">5 minutes before</option>
                    <option value="10">10 minutes before</option>
                    <option value="15">15 minutes before</option>
                    <option value="30">30 minutes before</option>
                    <option value="60">1 hour before</option>
                  </select>
                </div>
                
                <button className="btn-save">Save Changes</button>
              </div>
            </div>
          )}
          
          {activeTab === 'appearance' && (
            <div className="settings-section">
              <h2>Appearance Settings</h2>
              
              <div className="appearance-settings">
                <h3>Theme</h3>
                <div className="theme-options">
                  <div 
                    className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                    onClick={() => setTheme('light')}
                  >
                    <div className="theme-preview light"></div>
                    <span>Light</span>
                  </div>
                  
                  <div 
                    className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                    onClick={() => setTheme('dark')}
                  >
                    <div className="theme-preview dark"></div>
                    <span>Dark</span>
                  </div>
                  
                  <div 
                    className={`theme-option ${theme === 'system' ? 'active' : ''}`}
                    onClick={() => setTheme('system')}
                  >
                    <div className="theme-preview system"></div>
                    <span>System</span>
                  </div>
                </div>
                
                <h3>Calendar View</h3>
                <div className="form-group">
                  <select defaultValue="month">
                    <option value="day">Day</option>
                    <option value="week">Week</option>
                    <option value="month">Month</option>
                  </select>
                </div>
                
                <button className="btn-save">Save Changes</button>
              </div>
            </div>
          )}
          
          {activeTab === 'privacy' && (
            <div className="settings-section">
              <h2>Privacy & Security</h2>
              
              <div className="privacy-settings">
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <h3>Profile Visibility</h3>
                    <p>Make your profile visible to community members</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="setting-toggle">
                  <div className="toggle-info">
                    <h3>Share Statistics</h3>
                    <p>Allow your stats to appear on leaderboards</p>
                  </div>
                  <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider round"></span>
                  </label>
                </div>
                
                <div className="password-section">
                  <h3>Change Password</h3>
                  
                  <div className="form-group">
                    <label>Current Password</label>
                    <input type="password" />
                  </div>
                  
                  <div className="form-group">
                    <label>New Password</label>
                    <input type="password" />
                  </div>
                  
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input type="password" />
                  </div>
                  
                  <button className="btn-save">Update Password</button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'help' && (
            <div className="settings-section">
              <h2>Help & Support</h2>
              
              <div className="help-settings">
                <div className="faq-section">
                  <h3>Frequently Asked Questions</h3>
                  
                  <div className="faq-item">
                    <h4>How do I create a new habit?</h4>
                    <p>You can create a new habit by clicking the "Create New Habit" button on the Calendar page or Dashboard.</p>
                  </div>
                  
                  <div className="faq-item">
                    <h4>Can I export my data?</h4>
                    <p>Yes, you can export your data as CSV or JSON from the Settings page under the "Data" tab.</p>
                  </div>
                  
                  <div className="faq-item">
                    <h4>How do streaks work?</h4>
                    <p>Streaks count consecutive days where you've completed all your daily habits.</p>
                  </div>
                </div>
                
                <div className="contact-section">
                  <h3>Contact Support</h3>
                  <p>Need help with something not covered in the FAQs? Reach out to our support team.</p>
                  
                  <div className="form-group">
                    <label>Subject</label>
                    <select>
                      <option value="question">General Question</option>
                      <option value="bug">Bug Report</option>
                      <option value="feedback">Feedback</option>
                      <option value="feature">Feature Request</option>
                    </select>
                  </div>
                  
                  <div className="form-group">
                    <label>Message</label>
                    <textarea placeholder="Describe your issue or question..." />
                  </div>
                  
                  <button className="btn-send">Send Message</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;