import React, { useState, useEffect } from 'react';
import './IdeaPads.css';
import { NodeSelection } from '@tiptap/pm/state';
import Notepad from '../components/Notepad';
import { BUSINESS_PLAN_STEPS } from '../constants/businessPlanSteps';

const IdeaPads = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedText, setSelectedText] = useState('');
  const [selectionPosition, setSelectionPosition] = useState({ x: 0, y: 0 });
  const [showSelectionInput, setShowSelectionInput] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [notepadContent, setNotepadContent] = useState('');

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
    console.log("message", message);
    setIsLoading(true);
    
    // Create updated messages array with new user message
    const updatedMessages = [
        ...messages,
        { role: 'user', content: message }
    ];
    
    // Update state with user message first
    setMessages(updatedMessages);

    try {
      const response = await fetch('http://localhost:5001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ messages: updatedMessages }), // Use updated messages
      });
      
      // Add new message and response to messages array
      const data = await response.json();
      if (data.content && data.content.length > 0) {
        console.log('messages', messages)
        setMessages([
            ...updatedMessages, // Use updated messages here too
            { role: 'assistant', content: data.content[0].text }
        ]);
      }
    
      // Clear input field
      setMessage('');
      
    } catch (error) {
      console.error('Error:', error);
      // No need to set messages here as we already set the user message above
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
      setSelectionPosition({
        x: event.clientX,
        y: event.clientY + 10
      });
      setShowSelectionInput(true);
      // Add selected text to notepad content
      setNotepadContent(prev => prev + (prev ? '\n\n' : '') + selectedText);
    }
  };

  const handleNextStep = () => {
    if (currentStep < BUSINESS_PLAN_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleLastStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="ideapads-container" style={{ display: 'flex', flexDirection: 'row', gap: '20px' }}>
        <div className="chatbox">
            <div className="messages-wrapper" style={{ flex: 1, overflowY: 'auto' }}>
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
                            value={selectedText}
                            onChange={(e) => setSelectedText(e.target.value)}
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
            <div className="chatbox-footer">
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
                        <div className="suggestions">
                    <button className="suggestion-btn">Open a local store</button>
                    <button className="suggestion-btn">Starts selling online</button>
                    <button className="suggestion-btn">Building a product</button>
                </div>
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
            </div>
        </div>
        <Notepad 
            title={BUSINESS_PLAN_STEPS[currentStep].title}
            nextBtnText={BUSINESS_PLAN_STEPS[currentStep].nextBtnText}
            onNext={handleNextStep}
            onLast={handleLastStep}
            currentStep={currentStep}
            content={notepadContent}
            onContentChange={setNotepadContent}
        />
    </div>
  );
};

export default IdeaPads;
