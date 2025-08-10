// // src/components/Contact.jsx
// import React, { useState } from 'react';
// import './Contact.css';

// const Contact = () => {
//   const [form, setForm] = useState({ name: '', email: '', message: '' });

//   const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Message sent (demo only). Thanks!");
//     setForm({ name: '', email: '', message: '' });
//   };

//   return (
//     <div className="contact-section-full">
//       <div className="contact-section-centered">
//         <form onSubmit={handleSubmit} className="contact-form">
//           <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
//           <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
//           <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
//           <button type="submit">Send</button>
//         </form>
//         <div className="contact-info-bottom">
//           <p><strong>Email:</strong> eliteacademy@email.com</p>
//           <p><strong>Phone:</strong> +91-9876543210</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;













// src/components/Contact.jsx
import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Contact.css';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.send(
      process.env.REACT_APP_EMAILJS_SERVICE_ID,
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      form,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      toast.success("Message sent successfully!");
      setForm({ name: '', email: '', message: '' });
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message.");
    });
  };

  return (
    <div className="contact-section-full">
      <div className="contact-section-centered">
        <form onSubmit={handleSubmit} className="contact-form">
          <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} required />
          <input name="email" placeholder="Your Email" value={form.email} onChange={handleChange} required />
          <textarea name="message" placeholder="Your Message" value={form.message} onChange={handleChange} required />
          <button type="submit">Send</button>
        </form>
        <div className="contact-info-bottom">
          <p><strong>Email:</strong> eliteacademy@email.com</p>
          <p><strong>Phone:</strong> +91-9876543210</p>
        </div>
      </div>

      {/* ✅ Toast container */}
      <ToastContainer position="top-center" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Contact;
