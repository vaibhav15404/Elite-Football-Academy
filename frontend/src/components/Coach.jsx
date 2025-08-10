// import React from 'react';
// import { Link } from 'react-router-dom';

// const Coach = () => {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//       <img src="/assets/coach.jpg" alt="Coach" style={{ width: '250px', borderRadius: '10px' }} />
//       <div style={{ maxWidth: '500px' }}>
//         <h2>Coach Anil Sharma</h2>
//         <p>Former state-level player with over 10 years of experience. Dedicated to training young talent with discipline and passion.</p>
//         <a href="/about-coach" style={{ color: 'blue', textDecoration: 'underline' }}>View Achievements</a>
//       </div>
//     </div>
//   );
// };

// export default Coach;












import React from 'react';
import './Coach.css';
import coachImage from '../assets/coach.jpeg'; // Adjust the path as necessary

const Coach = () => {
  return (
    <div className="coach-section">
      <img src={coachImage} alt="Coach" className="coach-image" />
      <div className="coach-text">
        <h2>Coach Rajat Singh</h2>
        <p>
          As a former state-level player with over 10 years of experience, I bring a decade of on-field knowledge and expertise. I am passionate about instilling discipline, teamwork, and a love for the game in every young athlete. My goal is to develop not just skilled players, but dedicated and resilient individuals.
        </p>
        <a href="/about-coach" className="coach-button">View Achievements</a>
      </div>
    </div>
  );
};

export default Coach;