import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './Pages/Dashboard';
import Calendar from './Pages/Calendar';
import Ava from './Pages/Ava';
import Goals from './Pages/Goals';
import Analytics from './Pages/Analytics';
import Community from './Pages/Community';
import Settings from './Pages/Settings';
import './App.css';

function App() {
  const [habits, setHabits] = useState(() => {
    // Try to load habits from localStorage first as a fallback
    const savedHabits = localStorage.getItem('habits');
    return savedHabits ? JSON.parse(savedHabits) : [];
  });
  
  const [goals, setGoals] = useState(() => {
    // Try to load goals from localStorage first as a fallback
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch habits and goals from backend
    const fetchData = async () => {
      try {
        const habitsResponse = await fetch('http://localhost:5173/api/habits');
        const habitsData = await habitsResponse.json();
        
        const goalsResponse = await fetch('http://localhost:5173/api/goals');
        const goalsData = await goalsResponse.json();
        
        setHabits(habitsData);
        setGoals(goalsData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // If backend fails, use localStorage data if available
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Save to localStorage whenever habits or goals change
  useEffect(() => {
    localStorage.setItem('habits', JSON.stringify(habits));
  }, [habits]);
  
  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  const addHabit = async (newHabit) => {
    try {
      const response = await fetch('http://localhost:5000/api/habits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newHabit),
      });
      
      const data = await response.json();
      setHabits([...habits, data]);
    } catch (error) {
      console.error('Error adding habit:', error);
      // If API fails, add to state directly so UI still works
      setHabits([...habits, newHabit]);
    }
  };

  const addGoal = async (newGoal) => {
    try {
      const response = await fetch('http://localhost:5000/api/goals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newGoal),
      });
      
      const data = await response.json();
      setGoals([...goals, data]);
    } catch (error) {
      console.error('Error adding goal:', error);
      // If API fails, add to state directly so UI still works
      setGoals([...goals, newGoal]);
    }
  };

  // Update habit status
  const updateHabitStatus = async (habitId, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/habits/${habitId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      const data = await response.json();
      setHabits(habits.map(habit => habit.id === habitId ? data : habit));
    } catch (error) {
      console.error('Error updating habit:', error);
      // Update locally if API fails
      setHabits(habits.map(habit => 
        habit.id === habitId ? { ...habit, status: newStatus } : habit
      ));
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard habits={habits} goals={goals} updateHabitStatus={updateHabitStatus} />} />
            <Route path="/calendar" element={<Calendar habits={habits} addHabit={addHabit} />} />
            <Route path="/ava" element={<Ava />} />
            <Route path="/goals" element={<Goals goals={goals} addGoal={addGoal} />} />
            <Route path="/analytics" element={<Analytics habits={habits} goals={goals} />} />
            <Route path="/community" element={<Community />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;