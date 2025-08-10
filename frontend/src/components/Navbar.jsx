// import React, { useState, useEffect, useContext } from "react";
// import { AuthContext } from "../contexts/AuthContext";
// import { useNavigate, useLocation } from "react-router-dom";
// import "./Navbar.css";

// const Navbar = () => {
//   const [activeLink, setActiveLink] = useState("home");
//   const [showNavbar, setShowNavbar] = useState(true);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   let lastScrollTop = 0;

//   const handleScroll = () => {
//     const scrollTop = window.scrollY;
//     setShowNavbar(scrollTop < lastScrollTop || scrollTop < 100);
//     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

//     const sections = ["stats", "coach", "testimonials", "contact"];
//     let found = false;

//     for (let i = 0; i < sections.length; i++) {
//       const el = document.getElementById(sections[i]);
//       if (el) {
//         const rect = el.getBoundingClientRect();
//         if (rect.top <= 150 && rect.bottom >= 150) {
//           setActiveLink(sections[i]);
//           found = true;
//           break;
//         }
//       }
//     }

//     if (!found && window.scrollY < 300) {
//       setActiveLink("home");
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);
//     handleScroll(); // Trigger on mount in case you're already scrolled
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleClick = (link) => {
//     setActiveLink(link);
//     setMenuOpen(false);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
//       <span className="logo">Elite Football Academy</span>

//       <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
//         <div className="bar"></div>
//         <div className="bar"></div>
//         <div className="bar"></div>
//       </div>

//       <div className={`nav-links ${menuOpen ? "open" : ""}`}>
//         <a
//           href="/"
//           onClick={() => handleClick("home")}
//           className={
//             activeLink === "home" && location.pathname === "/" ? "active" : ""
//           }
//         >
//           Home
//         </a>
//         <a
//           href="/#stats"
//           onClick={() => handleClick("stats")}
//           className={activeLink === "stats" ? "active" : ""}
//         >
//           Stats
//         </a>
//         <a
//           href="/#coach"
//           onClick={() => handleClick("coach")}
//           className={activeLink === "coach" ? "active" : ""}
//         >
//           Coach
//         </a>
//         <a
//           href="/#testimonials"
//           onClick={() => handleClick("testimonials")}
//           className={activeLink === "testimonials" ? "active" : ""}
//         >
//           Testimonials
//         </a>
//         <a
//           href="/#contact"
//           onClick={() => handleClick("contact")}
//           className={activeLink === "contact" ? "active" : ""}
//         >
//           Contact
//         </a>

//         {user ? (
//           <>
//             {user.email === "vaibhav@example.com" ? (
//               <a
//                 href="/admin"
//                 onClick={() => handleClick("admin")}
//                 className={location.pathname === "/admin" ? "active" : ""}
//               >
//                 Admin Page
//               </a>
//             ) : (
//               <a
//                 href="/your-child"
//                 onClick={() => handleClick("your-child")}
//                 className={location.pathname === "/your-child" ? "active" : ""}
//               >
//                 Your Child
//               </a>
//             )}
//             {/* <div className="auth-buttons-mobile"> */}
//               <span className="greeting">Hi! {user.name}</span>
//               <button onClick={handleLogout} className="logout-btn">
//                 Logout
//               </button>
//             {/* </div> */}
//           </>
//         ) : (
//           <div className="auth-buttons-mobile">
//             <a href="/login" className="login-btn">
//               Login
//             </a>
//             <a href="/register" className="register-btn">
//               Register
//             </a>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [showNavbar, setShowNavbar] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setShowNavbar(scrollTop < lastScrollTop || scrollTop < 10);
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    const sections = ["stats", "coach", "testimonials", "contact"];
    let found = false;

    for (let i = 0; i < sections.length; i++) {
      const el = document.getElementById(sections[i]);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveLink(sections[i]);
          found = true;
          break;
        }
      }
    }

    if (!found && window.scrollY < 300) {
      setActiveLink("home");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Trigger on mount in case you're already scrolled
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (link) => {
    setActiveLink(link);
    setMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className={`navbar ${showNavbar ? "show" : "hide"}`}>
      <span className="logo">Elite Football Academy</span>

      <div className={`nav-center`}>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {/* Navigation Links */}
          {/* ... same as before ... */}
          <a
            href="/"
            onClick={() => handleClick("home")}
            className={
              activeLink === "home" && location.pathname === "/" ? "active" : ""
            }
          >
            Home
          </a>
          <a
            href="/#stats"
            onClick={() => handleClick("stats")}
            className={activeLink === "stats" ? "active" : ""}
          >
            Stats
          </a>
          <a
            href="/#coach"
            onClick={() => handleClick("coach")}
            className={activeLink === "coach" ? "active" : ""}
          >
            Coach
          </a>
          <a
            href="/#testimonials"
            onClick={() => handleClick("testimonials")}
            className={activeLink === "testimonials" ? "active" : ""}
          >
            Testimonials
          </a>
          <a
            href="/#contact"
            onClick={() => handleClick("contact")}
            className={activeLink === "contact" ? "active" : ""}
          >
            Contact
          </a>
          {user && user.email === "vaibhav@example.com" ? (
            <a
              href="/admin"
              className={location.pathname === "/admin" ? "active" : ""}
            >
              Admin Page
            </a>
          ) : user ? (
            <a
              href="/your-child"
              className={location.pathname === "/your-child" ? "active" : ""}
            >
              Your Child
            </a>
          ) : null}

          <div className={`auth-buttons ${menuOpen ? "open" : ""}`}>
        {user ? (
          <>
            <span className="greeting">Hi! {user.name}</span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </>
        ) : (
          <>
            <button onClick={()=>navigate("/login")} className="login-btn">
              Login
            </button>
            <button onClick={()=>navigate("/register")} className="register-btn">
              Register
            </button>
          </>
        )}
      </div>
        </div>
      </div>

      {/* Auth Buttons: Show inside menu on small screens */}
      
      {/* </div> */}

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
    </nav>
  );
};

export default Navbar;
