// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Add this
// import './Auth.css';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate(); // Hook for navigation

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('Login successful!');
//         localStorage.setItem('token', data.token);

//         // ✅ Reset fields
//         setEmail('');
//         setPassword('');

//         // ✅ Navigate to /home
//         navigate('/');
//       } else {
//         alert(data.message || 'Login failed');
//       }
//     } catch (err) {
//       console.error('Login Error:', err);
//       alert('Server error');
//     }
//   };

//   return (
//     <div className="auth-section">
//       <div className="auth-box">
//         <h2>Login</h2>
//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;














import React, { useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // ✅
import 'react-toastify/dist/ReactToastify.css';         // ✅
import './Auth.css';
import { AuthContext } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login ,isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

   useEffect(() => {
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login successful!'); // ✅ Toast instead of alert
        // localStorage.setItem('token', data.token);
        login(data.token);

        setEmail('');
        setPassword('');

        setTimeout(() => navigate('/'), 1000); // Navigate after 1 sec
      } else {
        toast.error(data.message || 'Login failed'); // ✅
      }
    } catch (err) {
      console.error('Login Error:', err);
      toast.error('Server error');
    }
  };

  return (
    <div className="auth-section">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
      </div>

      {/* ✅ Toast container to render toasts */}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
};

export default Login;
