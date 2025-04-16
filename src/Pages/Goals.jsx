import React, { useState } from 'react';
import { FaCheckCircle, FaTrash, FaEdit } from 'react-icons/fa';
import './Goals.css';

const Goals = ({ goals, addGoal }) => {
    const [showGoalForm, setShowGoalForm] = useState(false);
    const [newGoal, setNewGoal] = useState({
        title: '',
        description: '',
        targetDate: '',
        category: 'Personal',
        status: 'Not Started',
        relatedHabits: []
    });

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setNewGoal({
            ...newGoal,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addGoal(newGoal);
        setNewGoal({
            title: '',
            description: '',
            targetDate: '',
            category: 'Personal',
            status: 'Not Started',
            relatedHabits: []
        });
        setShowGoalForm(false);
    };

    const categoryColors = {
        Personal: '#4a90e2',
        Career: '#e67e22',
        Health: '#2ecc71',
        Financial: '#f1c40f',
        Educational: '#9b59b6',
        Spiritual: '#3498db'
    };

    return (
        <div className="goals-page">
            <div className="goals-header">
                <h1>Goals</h1>
                <button className="btn-create" onClick={() => setShowGoalForm(true)}>Create New Goal</button>
            </div>

            {showGoalForm ? (
                <div className="goal-form-container">
                    <h2>Create New Goal</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="goal-title">Goal Title</label>
                            <input
                                type="text"
                                id="goal-title"
                                name="title"
                                value={newGoal.title}
                                onChange={handleFormChange}
                                placeholder="What's your goal?"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="goal-description">Description</label>
                            <textarea
                                id="goal-description"
                                name="description"
                                value={newGoal.description}
                                onChange={handleFormChange}
                                placeholder="Describe your goal in detail"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="goal-targetDate">Target Date</label>
                            <input
                                type="date"
                                id="goal-targetDate"
                                name="targetDate"
                                value={newGoal.targetDate}
                                onChange={handleFormChange}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="goal-category">Category</label>
                            <select
                                id="goal-category"
                                name="category"
                                value={newGoal.category}
                                onChange={handleFormChange}
                            >
                                <option value="Personal">Personal</option>
                                <option value="Career">Career</option>
                                <option value="Health">Health</option>
                                <option value="Financial">Financial</option>
                                <option value="Educational">Educational</option>
                                <option value="Spiritual">Spiritual</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="goal-status">Status</label>
                            <select
                                id="goal-status"
                                name="status"
                                value={newGoal.status}
                                onChange={handleFormChange}
                            >
                                <option value="Not Started">Not Started</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Completed">Completed</option>
                            </select>
                        </div>

                        <div className="form-buttons">
                            <button type="button" className="btn-cancel" onClick={() => setShowGoalForm(false)}>Cancel</button>
                            <button type="submit" className="btn-save">Save Goal</button>
                        </div>
                    </form>

                </div>
            ) : (
                <div className="goals-content">
                    {goals.length === 0 ? (
                        <div className="empty-goals">
                            <h2>You don't have any goals yet</h2>
                            <p>Create your first goal to start tracking your progress</p>
                            <button className="btn-create" onClick={() => setShowGoalForm(true)}>Create New Goal</button>
                        </div>
                    ) : (
                        <div className="goals-grid">
                            {goals.map((goal, index) => (
                                <div key={index} className="goal-card">
                                    <div
                                        className="goal-category"
                                        style={{ backgroundColor: categoryColors[goal.category] || '#4a90e2' }}
                                    >
                                        {goal.category}
                                    </div>
                                    <h3 className="goal-title">{goal.title}</h3>
                                    <p className="goal-description">{goal.description}</p>

                                    {goal.targetDate && (
                                        <p className="goal-date">
                                            Target: {new Date(goal.targetDate).toLocaleDateString()}
                                        </p>
                                    )}

                                    <div className="goal-status">
                                        <span className={`status-badge ${goal.status.toLowerCase().replace(' ', '-')}`}>
                                            {goal.status}
                                        </span>
                                    </div>

                                    <div className="goal-actions">
                                        <button className="action-btn edit">
                                            <FaEdit />
                                        </button>
                                        <button className="action-btn complete">
                                            <FaCheckCircle />
                                        </button>
                                        <button className="action-btn delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Goals;