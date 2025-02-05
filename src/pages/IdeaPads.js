import React, { useState, useEffect } from 'react';
import './IdeaPads.css';
import { NodeSelection } from '@tiptap/pm/state';

const IdeaPads = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [showSelectionInput, setShowSelectionInput] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if selection input is showing and if click is outside
      if (showSelectionInput && !event.target.closest('.selection-input-section')) {
        setSelectedText('');
        setShowSelectionInput(false);
      }
    };

    // Add capture phase to ensure our handler runs before other handlers
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [showSelectionInput]); // Add showSelectionInput as dependency

  const handleSubmit = async () => {
    if (!message.trim()) return;
    
    setIsLoading(true);

    var assistantMessage = "Arrange your response in a JSON format with the following keys: 'questions', 'description', 'steps', 'resources', 'tools', 'tips'.";
    assistantMessage += "The 'questions' key should contain an array of questions that the user should answer to help them start their business.";
    assistantMessage += "The 'description' key should contain a description of the business.";
    assistantMessage += "The 'steps' key should contain an array of steps that the user should take to start their business.";
    assistantMessage += "The 'resources' key should contain an array of resources that the user should use to start their business.";
    assistantMessage += "The 'tools' key should contain an array of tools that the user should use to start their business.";
    assistantMessage += "The 'tips' key should contain an array of tips that the user should follow to start their business. ";
    assistantMessage += message
    setMessages([
        ...messages,
        { role: 'user', content: assistantMessage }
      ]);
      console.log(' messages', messages);
    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ messages }),
      });
      
      // Add new message and response to messages array
      const data = await response.json();
      if (data.content && data.content.length > 0) {
        setMessages([
            ...messages,
            { role: 'assistant', content: data.content[0].text }
          ]);
      }
    
      // Clear input field
      setMessage('');
      
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...messages,
        { role: 'user', content: message },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatResponse = (response) => {
    if (typeof response === 'string') return response;
    try {
      return JSON.stringify(response, null, 2);
    } catch (e) {
      return String(response);
    }
  };

  const formatParsedContent = (response) => {
    try {
      if (response?.content?.[0]?.text) {
        return JSON.parse(response.content[0].text);
      }
      return null;
    } catch (e) {
      console.error('Error parsing content:', e);
      return null;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleTextSelection = (event) => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (selectedText) {
      setSelectedText(selectedText);
      setMessage(selectedText);
      setSelectionPosition({
        x: event.clientX,
        y: event.clientY + 10
      });
      setShowSelectionInput(true);
    }
  };

  const handleSelectionSubmit = async () => {
    if (!selectedText.trim()) return;
    
    setIsLoading(true);
    try {
        setMessages([
            ...messages,
            { role: 'user', content: "Follow up question: " + selectedText }
          ]);
      const response = await fetch('http://localhost:5001/api/followup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ messages: messages }),
      });
      
      // Add new message and response to messages array
      const data = await response.json();
      if (data.content && data.content.length > 0) {
        setMessages([
            ...messages,
            { role: 'assistant', content: data.content[0].text }
          ]);
      }
      
      // Clear selection
      setSelectedText('');
      
    } catch (error) {
      console.error('Error:', error);
      setMessages([
        ...messages,
        { role: 'user', content: selectedText },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ideapads-container">
      <div className="header">
        <h1>Idea to business in seconds</h1>
        <p className="subtitle">Transform your ideas into business</p>
      </div>

      <div className="input-section">
        <textarea 
          className="main-input"
          placeholder="I want to build a landing page for my ..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="input-controls">
          <div className="left-controls">
            {/* <button className="control-btn"> */}
              {/* <span>📎 Attach</span>
            </button>
            <button className="control-btn">
              <span>🔗 Import</span>
            </button> */}
          </div>
          <div className="right-controls">
            <button className="control-btn">
              <span>🌐 Private</span>
            </button>
            <button 
              className="control-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              <span>{isLoading ? '⏳' : '↑'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="suggestions">
        <button className="suggestion-btn">Open a local store</button>
        <button className="suggestion-btn">Starts selling online</button>
        <button className="suggestion-btn">Building a product</button>
      </div>

      {/* Messages Display */}
      {messages.map((msg, index) => (
        <div key={index} className={`message ${msg.role}`}>
          {msg.role === 'user' ? (
            <div className="user-message">
              {/* Only show the actual user message, not the formatting instructions */}
              {msg.content.includes("Arrange your response in a JSON format") 
                ? msg.content.split("tips'.")[1].trim() 
                : msg.content}
            </div>
          ) : msg.role === 'assistant' ? (
            <div className="assistant-message">
              {/* Parsed Content Section */}
              {formatParsedContent(msg.content) && (
                <div 
                  className="parsed-content-section"
                  onMouseUp={handleTextSelection}
                >
                  <pre className="parsed-content">
                    {JSON.stringify(formatParsedContent(msg.content), null, 2)}
                  </pre>
                </div>
              )}
              
              {/* Raw Response */}
              <div 
                className="response-section"
                onMouseUp={handleTextSelection}
              >
                <div className="response-content">
                  <h3>Raw Response:</h3>
                  <pre className="response-text">
                    {formatResponse(msg.content)}
                  </pre>
                </div>
              </div>
            </div>
          ) : (
            <div className="error-message">{msg.content}</div>
          )}
        </div>
      ))}

      {isLoading && (
        <div className="loading">Generating response...</div>
      )}

      {/* Selection Input */}
      {showSelectionInput && (
        <div 
          className="selection-input-section"
          style={{
            left: `${selectionPosition.x}px`,
            top: `${selectionPosition.y}px`
          }}
        >
          <textarea 
            className="selection-input"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={2}
          />
          <div className="input-controls">
            <div className="left-controls">
              <button className="control-btn">
                <span>📎 Attach</span>
              </button>
              <button className="control-btn">
                <span>🔗 Import</span>
              </button>
            </div>
            <div className="right-controls">
              <button className="control-btn">
                <span>🌐 Public</span>
              </button>
              <button 
                className="control-btn"
                onClick={() => {
                    handleSelectionSubmit();
                  setShowSelectionInput(false);
                }}
                disabled={isLoading}
              >
                <span>{isLoading ? '⏳' : '↑'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IdeaPads;
