import React from 'react';

const ProductResearchGuides = () => {
  return (
    <div className="build-guides-container">
      <header>
        <h1>Product Research Guides</h1>
        <button className="change-idea-btn">Change app idea ↻</button>
      </header>

      <section className="guides-section">
        <h2>Start researching with your personalized guides</h2>
        <p>Use these research guides to validate and improve your product ideas step by step.</p>

        <div className="guides-grid">
          {/* First Row */}
          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Market Analysis Tools</h3>
            <p>Tools and techniques for analyzing market size, competitors, and opportunities in your target market.</p>
            <div className="guide-footer">
              <span>Follow 4 steps</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>User Research Methods</h3>
            <p>Comprehensive guide to conducting user interviews, surveys, and gathering valuable feedback.</p>
            <div className="guide-footer">
              <span>Follow along</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Competitor Analysis</h3>
            <p>Learn how to analyze competitors, their features, pricing, and market positioning.</p>
            <div className="guide-footer">
              <span>Follow along</span>
              <span className="arrow">→</span>
            </div>
          </div>

          {/* Second Row */}
          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Data Analytics Setup</h3>
            <p>Guide to setting up analytics tools and tracking key metrics for your product.</p>
            <div className="guide-footer">
              <span>Follow along</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>User Feedback Collection</h3>
            <p>Methods and tools for collecting and analyzing user feedback effectively.</p>
            <div className="guide-footer">
              <span>Follow along</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Research Documentation</h3>
            <p>Templates and best practices for documenting your product research findings.</p>
            <div className="guide-footer">
              <span>Follow along</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductResearchGuides; 