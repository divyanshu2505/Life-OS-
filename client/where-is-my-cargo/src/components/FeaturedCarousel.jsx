import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Scene3D from './Scene3D';
import locoData from '../data/locos.json';

export default function FeaturedCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const titleRef = useRef();
  const subRef = useRef();
  const ctaRef = useRef();
  const locos = locoData.locos.slice(0, 3); // Top 3 featured

  useEffect(() => {
    // Entrance animation
    const tl = gsap.timeline({ delay: 0.3 });
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo(subRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
      '-=0.6'
    )
    .fromTo(ctaRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
      '-=0.4'
    );
  }, []);

  useEffect(() => {
    // Auto-slide
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % locos.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [locos.length]);

  useEffect(() => {
    // Animate content on slide change
    gsap.fromTo('.carousel-content-inner', 
      { opacity: 0, x: -20 }, 
      { opacity: 1, x: 0, duration: 0.6, ease: 'power2.out' }
    );
  }, [currentIndex]);

  const currentLoco = locos[currentIndex];

  return (
    <section className="hero featured-carousel">
      <div className="hero-canvas">
        <Scene3D />
      </div>

      <div className="hero-content carousel-content">
        <div className="carousel-content-inner">
          <div className="hero-eyebrow">Featured Cargo · {currentLoco.type}</div>
          <h1 className="hero-title" ref={titleRef}>
            {currentLoco.id.split('-')[0]}<br /><em>{currentLoco.id.split('-')[1]}</em>
          </h1>
          <div className="hero-bottom">
            <p className="hero-sub" ref={subRef}>
              Transporting <strong>{currentLoco.cargo_tonnes.toLocaleString()}T</strong> of {currentLoco.cargo} <br/>
              from {currentLoco.origin} to {currentLoco.destination}.
            </p>
            <button className="hero-cta" ref={ctaRef} onClick={() => document.getElementById('fleet').scrollIntoView({ behavior: 'smooth' })}>
              View Details
              <span className="hero-cta-arrow">→</span>
            </button>
          </div>
        </div>

        <div className="carousel-controls">
          <div className="carousel-thumbnails">
            {locos.map((loco, idx) => (
              <div 
                key={loco.id} 
                className={`thumbnail ${idx === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(idx)}
              >
                <div className="thumb-title">{loco.id}</div>
                <div className="thumb-bar"><div className="thumb-progress" style={{ width: idx === currentIndex ? '100%' : '0%' }}></div></div>
              </div>
            ))}
          </div>
          <div className="carousel-arrows">
            <button onClick={() => setCurrentIndex((prev) => (prev - 1 + locos.length) % locos.length)}>←</button>
            <button onClick={() => setCurrentIndex((prev) => (prev + 1) % locos.length)}>→</button>
          </div>
        </div>
      </div>
    </section>
  );
}
