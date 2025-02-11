import React from 'react';
import './Notepad.css';

const Notepad = ({ 
    title = "Notes", 
    nextBtnText = "Next", 
    onNext, 
    onLast, 
    currentStep,
    content,
    onContentChange 
}) => {
    return (
        <div className='notepad'>
            <div className="notepad-title">
                <div className="title-row">
                    <h3>{title}</h3>
                    <div className="button-group">
                        {currentStep > 0 && (
                            <button 
                                className="last-btn"
                                onClick={onLast}
                            >
                                Last step
                            </button>
                        )}
                        <button 
                            className="next-btn"
                            onClick={onNext}
                        >
                            {nextBtnText}
                        </button>
                    </div>
                </div>
            </div>
            <textarea
                className="notepad-content"
                placeholder="Write your notes here..."
                value={content}
                onChange={(e) => onContentChange(e.target.value)}
            />
            <div className="notepad-footer">
                <h3>References</h3>
                <textarea
                    className="references-content"
                    placeholder="Add your sources"
                />
            </div>
        </div>
    );
};

export default Notepad; 