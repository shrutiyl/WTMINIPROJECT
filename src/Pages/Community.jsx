import React from 'react';
import './Community.css';

const Community = () => {
  const communityMembers = [
    { username: 'fitnessFan', habits: 23, streak: 45 },
    { username: 'dailyReader', habits: 15, streak: 60 },
    { username: 'earlyRiser', habits: 18, streak: 30 },
    { username: 'mindfulMeditation', habits: 12, streak: 90 },
    { username: 'waterDrinker', habits: 8, streak: 120 }
  ];

  const challenges = [
    { 
      title: '30 Day Meditation', 
      participants: 245, 
      description: 'Meditate for at least 10 minutes every day for 30 days.'
    },
    { 
      title: 'Morning Routine Challenge', 
      participants: 158, 
      description: 'Wake up at 6 AM and complete a morning routine for 21 days.'
    },
    { 
      title: 'Reading Hour', 
      participants: 112, 
      description: 'Read for 1 hour every day for 14 days.'
    }
  ];

  return (
    <div className="community-page">
      <h1>Community</h1>
      
      <div className="community-grid">
        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <table className="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Username</th>
                <th>Habits</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {communityMembers.sort((a, b) => b.streak - a.streak).map((member, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{member.username}</td>
                  <td>{member.habits}</td>
                  <td>{member.streak} days</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="challenges">
          <h2>Challenges</h2>
          <div className="challenges-list">
            {challenges.map((challenge, index) => (
              <div className="challenge-card" key={index}>
                <h3>{challenge.title}</h3>
                <p className="participants">{challenge.participants} participants</p>
                <p className="description">{challenge.description}</p>
                <button className="btn-join">Join Challenge</button>
              </div>
            ))}
          </div>
          <button className="btn-create">Create Challenge</button>
        </div>
        
        <div className="tips-section">
          <h2>Habit Formation Tips</h2>
          <div className="tips-list">
            <div className="tip-card">
              <h3>Start Small</h3>
              <p>Begin with easy habits that take less than two minutes to complete.</p>
            </div>
            <div className="tip-card">
              <h3>Stack Habits</h3>
              <p>Connect new habits to existing behaviors in your routine.</p>
            </div>
            <div className="tip-card">
              <h3>Track Progress</h3>
              <p>Use visual cues like calendars to maintain motivation.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;