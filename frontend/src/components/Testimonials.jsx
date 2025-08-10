// src/components/Testimonials.jsx
import React, { useState, useEffect } from 'react';
import './Testimonials.css';

const testimonials = [
  { name: `Rahul's Parent`, quote: 'Great academy! My child loves training here.' },
  { name: `Sneha's Parent`, quote: 'Coach is very experienced and disciplined.' },
  { name: 'Amit', quote: 'I learned so much in just a few months.' },
  { name: 'Priya', quote: 'Best football coaching in town!' },
  { name: 'Rohit', quote: 'My skills improved a lot thanks to the coach.' },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const updateMedia = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  const next = () => setIndex((index + 1) % testimonials.length);
  const prev = () => setIndex((index - 1 + testimonials.length) % testimonials.length);

  const visibleTestimonials = isMobile
    ? [testimonials[index]]
    : [
        testimonials[index],
        testimonials[(index + 1) % testimonials.length],
      ];

  return (
    <div className="testimonials-section">
        <h2>What Our Students and their parents say</h2>
      <div className="testimonial-container">
        <button onClick={prev} className="testimonial-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
          </svg>
        </button>
        <div className="testimonial-cards slide-in">
          {visibleTestimonials.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <h3>"{t.quote}"</h3>
              <p>- {t.name}</p>
            </div>
          ))}
        </div>
        <button onClick={next} className="testimonial-btn">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Testimonials;