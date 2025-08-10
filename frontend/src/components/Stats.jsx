// // src/components/Stats.jsx
// import React from 'react';

// const stats = [
//   { label: 'Students Trained', value: '150+' },
//   { label: 'Years of Experience', value: '10+' },
//   { label: 'Tournaments Won', value: '25+' },
//   { label: 'Certifications', value: 'FIFA Level 2' },
// ];

// const Stats = () => {
//   return (
//     <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
//       {stats.map((stat, idx) => (
//         <div key={idx} style={{ textAlign: 'center', padding: '20px', border: '1px solid #ccc', borderRadius: '10px', width: '150px', margin: '10px' }}>
//           <h2>{stat.value}</h2>
//           <p>{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stats;














// import React, { useEffect, useState } from 'react';
// import './Stats.css';

// const statsData = [
//   { label: 'Students Trained', value: 150 },
//   { label: 'Years of Experience', value: 10 },
//   { label: 'Tournaments Won', value: 25 },
//   { label: 'Certifications', value: 'FIFA Level 2', isStatic: true }
// ];

// const Stats = () => {
//   const [counts, setCounts] = useState(statsData.map(() => 0));

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounts(prevCounts =>
//         prevCounts.map((count, index) => {
//           const target = statsData[index].value;
//           if (typeof target === 'string' || count >= target) return target;
//           return count + Math.ceil(target / 30);
//         })
//       );
//     }, 50);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="stats-section">
//       {statsData.map((stat, index) => (
//         <div className="stat-card" key={index}>
//           <h2>{stat.isStatic ? stat.value : `${counts[index]}${typeof stat.value === 'number' ? '+' : ''}`}</h2>
//           <p>{stat.label}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stats;






















import React, { useEffect, useState, useRef } from 'react';
import './Stats.css';

const statsData = [
  { label: 'Students Trained', value: 150 },
  { label: 'Years of Experience', value: 10 },
  { label: 'Tournaments Won', value: 25 },
  { label: 'Certifications', value: 'FIFA Level 2', isStatic: true }
];

const Stats = () => {
  const [counts, setCounts] = useState(statsData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  useEffect(() => {
    if (!hasAnimated) return;
    const interval = setInterval(() => {
      setCounts(prevCounts =>
        prevCounts.map((count, index) => {
          const target = statsData[index].value;
          if (typeof target === 'string' || count >= target) return target;
          return count + Math.ceil(target / 30);
        })
      );
    }, 50);

    return () => clearInterval(interval);
  }, [hasAnimated]);

  return (
    <div className="stats-section" ref={statsRef}>
      {statsData.map((stat, index) => (
        <div className="stat-card" key={index}>
          <h2>{stat.isStatic ? stat.value : `${counts[index]}${typeof stat.value === 'number' ? '+' : ''}`}</h2>
          <p>{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;