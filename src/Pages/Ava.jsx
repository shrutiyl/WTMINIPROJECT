import React, { useState, useRef, useEffect } from 'react';
import { 
  IoChatbubbleEllipsesOutline, 
  IoSendSharp, 
  IoCloseOutline,
  IoChevronDownOutline,
  IoTimeOutline
} from 'react-icons/io5';
import './Ava.css';

const Ava = () => {
  const [isChatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi there! I'm Ava, your personal habit assistant. How can I help you with your habits and goals today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isChatOpen]);

  const toggleChat = () => {
    setChatOpen(!isChatOpen);
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const formatTimestamp = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const sendMessage = () => {
    if (inputText.trim() === '') return;

    const newMessage = {
      id: Date.now(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputText('');

    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses = [
        "That's a great habit to build! Try starting with just 5 minutes a day to build consistency.",
        "I recommend tracking this habit daily to see your progress over time.",
        "Have you considered setting a specific time each day for this habit?",
        "Breaking this goal into smaller milestones might help you stay motivated.",
        "Great progress! Remember that consistency is more important than perfection."
      ];

      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botReply = {
        id: Date.now() + 1,
        text: randomResponse,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prevMessages => [...prevMessages, botReply]);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {!isChatOpen && (
        <div className="chat-button" onClick={toggleChat}>
          <IoChatbubbleEllipsesOutline className="chat-icon" />
        </div>
      )}

      {isChatOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <div className="chat-title">
              <div className="bot-avatar">A</div>
              <div className="bot-info">
                <h3>Ava</h3>
                <span className="bot-status">Your Habit Assistant</span>
              </div>
            </div>
            <div className="chat-actions">
              <button className="minimize-button" onClick={toggleChat}>
                <IoChevronDownOutline />
              </button>
              <button className="close-button" onClick={toggleChat}>
                <IoCloseOutline />
              </button>
            </div>
          </div>
          
          <div className="messages-container">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
              >
                <div className="message-content">
                  {message.text}
                </div>
                <div className="message-timestamp">
                  <IoTimeOutline className="time-icon" />
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="chat-input-container">
            <textarea
              ref={inputRef}
              value={inputText}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type your question about habits..."
              className="chat-input"
              rows={1}
            />
            <button 
              className={`send-button ${inputText.trim() ? 'active' : ''}`}
              onClick={sendMessage}
              disabled={!inputText.trim()}
            >
              <IoSendSharp />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Ava;