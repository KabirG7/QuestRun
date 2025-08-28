import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const races = [
    {
      id: 1,
      name: "Himalayan Challenge",
      description: "Scale the world's highest peaks in this legendary 50km virtual journey through the Himalayas.",
      distance: "50km",
      duration: "30 days",
      difficulty: "EPIC",
      medal: "🏔️",
      background: "himalayan-bg",
      rarity: "epic"
    },
    {
      id: 2,
      name: "Amazon Explorer",
      description: "Journey through the world's largest rainforest in this 35km adventure of discovery.",
      distance: "35km",
      duration: "21 days",
      difficulty: "LEGENDARY",
      medal: "🌿",
      background: "amazon-bg",
      rarity: "legendary"
    },
    {
      id: 3,
      name: "Sahara Crossing",
      description: "Cross the vast Sahara desert in this ultimate 100km endurance challenge.",
      distance: "100km",
      duration: "60 days",
      difficulty: "MYTHIC",
      medal: "🏜️",
      background: "sahara-bg",
      rarity: "mythic"
    },
    {
      id: 4,
      name: "Arctic Adventure",
      description: "Brave the frozen wilderness in this chilling ultimate 25km polar expedition.",
      distance: "25km",
      duration: "15 days",
      difficulty: "RARE",
      medal: "❄️",
      background: "arctic-bg",
      rarity: "rare"
    },
  ];

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <h2>RunQuest</h2>
          </div>
          <ul className="nav-menu">
            <li><a href="#about">About</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#races">Races</a></li>
            <li><a href="#" className="cta-btn">Start Running</a></li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="title-line-1">Run Anywhere.</span>
            <span className="title-line-2">Earn <span className="gradient-text">Verified</span> Medals.</span>
            <span className="title-line-3">Join the Adventure.</span>
          </h1>
          <p className="hero-subtitle">Transform your daily runs into epic adventures. Complete virtual challenges and earn stunning, blockchain-verified digital medals that showcase your achievements.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Start Your Journey</button>
            <button className="btn-secondary">Watch Demo</button>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">25K+</span>
              <span className="stat-label">Medals Earned</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">150+</span>
              <span className="stat-label">Virtual Races</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">85</span>
              <span className="stat-label">Countries</span>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">About RunQuest</h2>
              <p className="about-description">
                RunQuest revolutionizes fitness by transforming your real-world runs into virtual adventures. 
                Using GPS tracking and blockchain verification, every mile you run counts toward completing 
                epic virtual journeys inspired by legendary routes and mythical landscapes.
              </p>
              <div className="about-features">
                <div className="feature-item">
                  <div className="feature-icon">🌍</div>
                  <div className="feature-text">
                    <h4>Global Adventures</h4>
                    <p>Run virtual routes from Mount Everest to the Amazon rainforest</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🏆</div>
                  <div className="feature-text">
                    <h4>Verified Achievements</h4>
                    <p>Blockchain-secured medals that prove your accomplishments</p>
                  </div>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">👥</div>
                  <div className="feature-text">
                    <h4>Community Driven</h4>
                    <p>Join thousands of runners on their virtual adventures</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="about-visual">
              <div className="medal-showcase">
              
              </div>
              <div className="verification-badge">
                <div className="badge-icon">✓</div>
                <span>Verified Runner</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Why Choose RunQuest?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="card-icon">📱</div>
              <h3>Smart Tracking</h3>
              <p>Advanced GPS tracking that works with any fitness device. Your runs are automatically recorded and verified.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">🎨</div>
              <h3>Beautiful Medals</h3>
              <p>Stunning, artistic digital medals designed by professional artists. Each medal tells a unique story.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">🔐</div>
              <h3>Blockchain Verified</h3>
              <p>Every medal is secured on the blockchain, making your achievements permanent and verifiable.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">🌟</div>
              <h3>Gamification</h3>
              <p>Unlock achievements, climb leaderboards, and earn special rewards as you complete more challenges.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">📊</div>
              <h3>Progress Tracking</h3>
              <p>Detailed analytics show your improvement over time with beautiful visualizations and insights.</p>
            </div>
            <div className="feature-card">
              <div className="card-icon">🎯</div>
              <h3>Personal Goals</h3>
              <p>Set custom challenges and create your own virtual adventures with friends and family.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Races Section */}
      <section id="races" className="races">
        <div className="container">
          <h2 className="section-title">Virtual Race Collection</h2>
          <p className="section-subtitle">Choose your adventure and start earning magnificent medals</p>
          
          <div className="races-grid">
            {races.map((race) => (
              <div key={race.id} className={`race-card ${race.rarity}`}>
                <div className={`race-background ${race.background}`}></div>
                <div className="race-content">
                  <div className="race-medal">
                    <div className="medal-container">
                      <div className="medal-design">{race.medal}</div>
                      <div className="medal-shine"></div>
                    </div>
                  </div>
                  <div className="race-info">
                    <span className={`race-difficulty ${race.rarity}-badge`}>{race.difficulty}</span>
                    <h3>{race.name}</h3>
                    <p>{race.description}</p>
                    <button className="race-btn">Start Challenge</button>
                  </div>
                </div>
              </div>
            ))} 
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta">
        <div className="container">
          <h2>Ready to Start Your Adventure?</h2>
          <p>Join thousands of runners earning verified medals worldwide</p>
          <button className="btn-primary large">Download RunQuest App</button>
        </div>
      </section>
    </div>
    
  );
};

export default App;