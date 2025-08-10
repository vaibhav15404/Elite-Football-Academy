// // src/components/Hero.jsx
// import React from 'react';

// const Hero = () => {
//   return (
//     <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
//       <div>
//         <h1>Elite Football Academy</h1>
//         <p>Building champions through discipline and passion for the game.</p>
//       </div>
//       <img src="frontend\src\assets\hero.jpg" alt="Football Academy" style={{ width: '300px', height: 'auto' }} />
//     </div>
//   );
// };

// export default Hero;













// src/components/Hero.jsx
// import React from 'react';
// import './Hero.css';
// import heroImage from '../assets/hero.jpg'; // Adjust the path as necessary

// const Hero = () => {
//   return (
//     <div className="hero">
//       <div className="hero-content">
//         <div className="hero-text">
//           <h1>Elite Football Academy</h1>
//           <p>Welcome to Bhiwadi Football Academy, your premier destination for aspiring footballers in Rajasthan. We offer expert coaching, state-of-the-art facilities, and a holistic approach to skill development. Join us to nurture your talent and become a champion.</p>
//         </div>
//         <img src= {heroImage} alt="Football Academy" className="hero-image" />
//       </div>
//     </div>
//   );
// };

// export default Hero;



import React from 'react';
import './Home.css';
import heroImage from '../assets/hero-landing.jpg';

const Home = () => {
  return (
    <div className="hero">
      <div className="hero-content">
        <div className="hero-text">
          <h1>Elite Football Academy</h1>
          <p>Welcome to Bhiwadi Football Academy, your premier destination for aspiring footballers in Rajasthan. We offer expert coaching, state-of-the-art facilities, and a holistic approach to skill development. Join us to nurture your talent and become a champion.</p>
          <button className="hero-button">Join Now</button>
        </div>
        <img src={heroImage} alt="Football Academy" className="hero-image" />
      </div>
    </div>
  );
};

export default Home;