// // src/contexts/AuthContext.js
// import React, { createContext, useEffect, useState } from 'react';
// import {jwtDecode} from 'jwt-decode';
// import axios from 'axios';

// export const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on initial mount
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       try {
//         const decoded = jwtDecode(token);
//         setUser(decoded);
//       } catch (err) {
//         console.error('Invalid token:', err);
//         localStorage.removeItem('token');
//       }
//     }
//   }, []);

//   const login = (token) => {
//     localStorage.setItem('token', token);
//     const decoded = jwtDecode(token);
//     const userId = decoded.id;

//     axios.get(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(res => {
//      setUser(res.data);
//     })

//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

// src/contexts/AuthContext.js
import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));


  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const userId = decoded.id;

        axios
          .get(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log("User data fetched:", res.data);
            setUser(res.data);
          })
          .catch((err) => {
            console.error("Error fetching user:", err);
            setUser(null);
            localStorage.removeItem("token");
          })
          .finally(() => {
            setLoading(false); // ✅ moved inside finally
          });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
        setLoading(false); // ✅ also set here
      }
    } else {
      setLoading(false); // ✅ when no token at all
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    const decoded = jwtDecode(token);
    const userId = decoded.id;

    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        loading,
        isLoggedIn: !!user, // ✅ Add this line
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
