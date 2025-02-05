import React from 'react';
import trophyIcon from '../assets/images/icons/trophy.svg';
import softwareImage from '../assets/images/engineers/software.webp';

const BuildProduct = () => {
  return (
    <div className="build-guides-container">
      <header>
        <h1>Build Product</h1>
        <button className="change-idea-btn">Change app idea ↻</button>
      </header>

      <section className="featured-engineers-section">
        <div className="featured-header">
          <div className="featured-title">
            <img src={trophyIcon} alt="" className="trophy-icon" />
            <h2>Recommended engineers</h2>
            <button className="refresh-btn">↻</button>
          </div>
        </div>

        <div className="engineers-grid">
          <div className="engineer-card">
            <div className="engineer-image">
              <img src={softwareImage} alt="" />
              <button className="favorite-btn">♡</button>
            </div>
            <div className="engineer-info">
              <div className="engineer-header">
                <span className="name">Hammad</span>
                <span className="badge rising-talent">Rising Talent</span>
              </div>
              <h3>I will design a professional wordpress website or web design</h3>
              <div className="rating">
                <span className="stars">★ 4.9</span>
                <span className="reviews">(799)</span>
              </div>
              <div className="price">$125 - $499</div>
              <div className="match-reasons">
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  Matches your WordPress tech stack preference
                </div>
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  Completed 5 similar projects recently
                </div>
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  Available in your timezone
                </div>
              </div>
            </div>
          </div>

          <div className="engineer-card">
            <div className="engineer-image">
              <img src={softwareImage} alt="" />
              <button className="favorite-btn">♡</button>
            </div>
            <div className="engineer-info">
              <div className="engineer-header">
                <span className="name">Bilal</span>
                <span className="badge experienced-pro">Experienced Pro</span>
              </div>
              <h3>I will design clean and responsive wordpress website</h3>
              <div className="rating">
                <span className="stars">★ 4.9</span>
                <span className="reviews">(773)</span>
              </div>
              <div className="price">$150 - $699</div>
              <div className="match-reasons">
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  Has built similar marketplace platforms
                </div>
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  Expertise in responsive design
                </div>
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  High client satisfaction rate
                </div>
              </div>
            </div>
          </div>

          <div className="engineer-card">
            <div className="engineer-image">
              <img src={softwareImage} alt="" />
              <button className="favorite-btn">♡</button>
            </div>
            <div className="engineer-info">
              <div className="engineer-header">
                <span className="name">Nick</span>
                <span className="badge elite-expert">Elite Expert</span>
              </div>
              <h3>I will build your professional dropshipping shopify store</h3>
              <div className="rating">
                <span className="stars">★ 5.0</span>
                <span className="reviews">(1k+)</span>
              </div>
              <div className="price">$325 - $999</div>
              <div className="match-reasons">
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  Expert in e-commerce development
                </div>
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  10+ years of marketplace experience
                </div>
                <div className="match-reason">
                  <span className="match-icon">•</span>
                  Specializes in scalable solutions
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="guides-section">
        <h2>Start building your product</h2>
        <p>Follow these guides to transform your validated idea into a working product.</p>
        <div className="find-engineers-section">
          <button className="find-engineers-btn">
            Find qualified engineers to build your product
          </button>
        </div>

        <div className="guides-grid">
          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Tech Stack Selection</h3>
            <p>Choose the right technologies and frameworks for your product requirements.</p>
            <div className="guide-footer">
              <span>Start selecting</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Architecture Planning</h3>
            <p>Design a scalable and maintainable architecture for your product.</p>
            <div className="guide-footer">
              <span>Start planning</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Development Setup</h3>
            <p>Set up your development environment and essential tools.</p>
            <div className="guide-footer">
              <span>Setup now</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>MVP Features</h3>
            <p>Implement core features for your minimum viable product.</p>
            <div className="guide-footer">
              <span>Start coding</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Testing Strategy</h3>
            <p>Implement effective testing practices to ensure product quality.</p>
            <div className="guide-footer">
              <span>Begin testing</span>
              <span className="arrow">→</span>
            </div>
          </div>

          <div className="guide-card">
            <span className="difficulty-badge">MODERATE</span>
            <h3>Code Quality</h3>
            <p>Establish best practices for maintaining high code quality.</p>
            <div className="guide-footer">
              <span>Learn more</span>
              <span className="arrow">→</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BuildProduct; 