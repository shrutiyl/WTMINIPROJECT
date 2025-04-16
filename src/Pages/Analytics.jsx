import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line
} from 'recharts';
import './Analytics.css';

const Analytics = ({ habits, goals }) => {
  const [timeFrame, setTimeFrame] = useState('week');
  
  // Process data for charts
  const categoryCounts = {};
  habits.forEach(habit => {
    if (categoryCounts[habit.category]) {
      categoryCounts[habit.category]++;
    } else {
      categoryCounts[habit.category] = 1;
    }
  });
  
  const categoryData = Object.keys(categoryCounts).map(category => ({
    name: category,
    count: categoryCounts[category]
  }));
  
  const statusCounts = {
    'Pending': 0,
    'In Progress': 0,
    'Completed': 0
  };
  
  habits.forEach(habit => {
    if (statusCounts[habit.status] !== undefined) {
      statusCounts[habit.status]++;
    }
  });
  
  const statusData = Object.keys(statusCounts).map(status => ({
    name: status,
    value: statusCounts[status]
  }));
  
  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
  
  // Weekly data for line chart
  const weeklyData = [
    { name: 'Mon', completed: 5, total: 8 },
    { name: 'Tue', completed: 7, total: 10 },
    { name: 'Wed', completed: 4, total: 7 },
    { name: 'Thu', completed: 6, total: 9 },
    { name: 'Fri', completed: 8, total: 12 },
    { name: 'Sat', completed: 9, total: 11 },
    { name: 'Sun', completed: 7, total: 9 }
  ];
  
  return (
    <div className="analytics-page">
      <h1>Analytics</h1>
      
      <div className="timeframe-selector">
        <button 
          className={timeFrame === 'week' ? 'active' : ''} 
          onClick={() => setTimeFrame('week')}
        >
          Week
        </button>
        <button 
          className={timeFrame === 'month' ? 'active' : ''} 
          onClick={() => setTimeFrame('month')}
        >
          Month
        </button>
        <button 
          className={timeFrame === 'year' ? 'active' : ''} 
          onClick={() => setTimeFrame('year')}
        >
          Year
        </button>
      </div>
      
      <div className="analytics-grid">
        <div className="chart-container">
          <h2>Habits by Category</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container">
          <h2>Habit Status</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        <div className="chart-container full-width">
          <h2>Daily Completion Rate</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="completed" stroke="#8884d8" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="stats-summary">
          <h2>Summary</h2>
          <div className="stats-grid">
            <div className="stat-box">
              <h3>Total Habits</h3>
              <p className="stat-value">{habits.length}</p>
            </div>
            <div className="stat-box">
              <h3>Completion Rate</h3>
              <p className="stat-value">
                {habits.length > 0 
                  ? `${Math.round((statusCounts.Completed / habits.length) * 100)}%` 
                  : '0%'}
              </p>
            </div>
            <div className="stat-box">
              <h3>Active Goals</h3>
              <p className="stat-value">
                {goals.filter(goal => goal.status !== 'Completed').length}
              </p>
            </div>
            <div className="stat-box">
              <h3>Most Active Category</h3>
              <p className="stat-value">
                {categoryData.length > 0 
                  ? categoryData.sort((a, b) => b.count - a.count)[0].name 
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
