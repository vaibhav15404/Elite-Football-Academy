// import React, { useState } from 'react';
// import './Auth.css';

// const Register = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ name, email, password }),
//       });

//       const data = await res.json();

//       if (res.ok) {
//         alert('Registration successful!');
//         localStorage.setItem('token', data.token);
//         // navigate to login or homepage
//       } else {
//         alert(data.message || 'Registration failed');
//       }
//     } catch (err) {
//       alert('Server error');
//     }
//   };

//   return (
//     <div className="auth-section">
//       <div className="auth-box">
//         <h2>Register</h2>
//         <form onSubmit={handleRegister}>
//           <input
//             type="text"
//             placeholder="Name"
//             required
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />
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
//           <button type="submit">Register</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;











import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful! Redirecting to login...', {
          position: 'top-center',
          autoClose: 2000,
        });

        setTimeout(() => {
          navigate('/login');
        }, 2500);
      } else {
        toast.error(data.message || 'Registration failed', {
          position: 'top-center',
        });
      }
    } catch (err) {
      toast.error('Server error', { position: 'top-center' });
    }
  };

  return (
    <div className="auth-section">
      <div className="auth-box">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
          <button type="submit">Register</button>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Register;
