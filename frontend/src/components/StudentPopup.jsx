// // StudentPopup.jsx
// import React from 'react';

// const StudentPopup = ({ studentData, handleChange, handleSubmit, onClose }) => {
//   const fields = [
//     'studentId', 'name', 'monthlyFees', 'age', 'address',
//     'guardianName', 'phoneNumber', 'altPhoneNumber',
//     'joiningDate', 'email'
//   ];

//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <h2>{studentData?.studentId ? 'Edit Student' : 'Add New Student'}</h2>
//         <div className="form-scroll">
//           {fields.map((field) => (
//             <input
//               key={field}
//               name={field}
//               type={field.includes("Date") ? "date" : (field.includes("email") ? "email" : "text")}
//               placeholder={field.replace(/([A-Z])/g, " $1")}
//               value={studentData[field] || ''}
//               onChange={handleChange}
//               required
//             />
//           ))}
//         </div>
//         <div className="popup-actions">
//           <button onClick={handleSubmit}>Submit</button>
//           <button onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentPopup;









// import React from 'react';

// const StudentPopup = ({ studentData, setStudentData, setShowPopup, selectedStudent, setSelectedStudent, fetchStudents }) => {
//   const fields = [
//     'studentId', 'name', 'monthlyFees', 'age', 'address',
//     'guardianName', 'phoneNumber', 'altPhoneNumber',
//     'joiningDate', 'email'
//   ];

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setStudentData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/students/${studentData.studentId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(studentData)
//       });
//       if (res.ok) {
//         fetchStudents();
//         setShowPopup(false);
//         setSelectedStudent(null);
//       } else {
//         console.error("Failed to update");
//       }
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="popup-overlay">
//       <div className="popup">
//         <h2>Edit Student</h2>
//         <div className="form-scroll">
//           {fields.map((field) => (
//             <input
//               key={field}
//               name={field}
//               type={field.includes("Date") ? "date" : field.includes("email") ? "email" : "text"}
//               placeholder={field.replace(/([A-Z])/g, " $1")}
//               value={studentData[field] || ''}
//               onChange={handleChange}
//               required
//             />
//           ))}
//         </div>
//         <div className="popup-actions">
//           <button onClick={handleSubmit}>Update</button>
//           <button onClick={() => setShowPopup(false)}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentPopup;












// import React, { useState, useEffect } from 'react';
// import './PopupStyles.css'; // make sure to include this for dark/red styling
// import { toast } from 'react-toastify';

// const StudentPopup = ({ studentData, onClose, fetchStudents }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (studentData) {
//       setFormData(studentData);
//     }
//   }, [studentData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/students/update/${formData.studentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (res.ok) {
//         toast.success("Student updated");
//         fetchStudents();
//         onClose();
//       } else {
//         toast.error("Update failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating student");
//     }
//   };

//   const fields = [
//     { name: 'name', label: 'Name' },
//     { name: 'monthlyFees', label: 'Monthly Fees', type: 'number' },
//     { name: 'age', label: 'Age', type: 'number' },
//     { name: 'address', label: 'Address' },
//     { name: 'guardianName', label: 'Guardian Name' },
//     { name: 'phoneNumber', label: 'Phone Number' },
//     { name: 'altPhoneNumber', label: 'Alternate Phone' },
//     { name: 'joiningDate', label: 'Joining Date', type: 'date' },
//     { name: 'email', label: 'Email', type: 'email' },
//   ];

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Edit Student</h2>
//         <div className="form-scroll">
//           {fields.map(({ name, label, type }) => (
//             <input
//               key={name}
//               name={name}
//               type={type || "text"}
//               placeholder={label}
//               value={formData[name] || ""}
//               onChange={handleChange}
//               required
//             />
//           ))}
//         </div>
//         <div className="popup-actions">
//           <button className="btn red" onClick={handleUpdate}>Update</button>
//           <button className="btn" onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentPopup;













// import React, { useState, useEffect } from 'react';
// import './PopupStyles.css'; // make sure to include this for dark/red styling
// import { toast } from 'react-toastify';

// const StudentPopup = ({ studentData, onClose, fetchStudents }) => {
//   const [formData, setFormData] = useState({});

//   useEffect(() => {
//     if (studentData) {
//       setFormData(studentData);
//     }
//   }, [studentData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleUpdate = async () => {
//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/students/update/${formData.studentId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(formData)
//       });

//       if (res.ok) {
//         toast.success("Student updated");
//         fetchStudents();
//         onClose();
//       } else {
//         toast.error("Update failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error updating student");
//     }
//   };

//   const handleDelete = async () => {
//     if (!window.confirm("Are you sure you want to delete this student?")) return;

//     try {
//       const res = await fetch(`${process.env.REACT_APP_API_URL}/students/delete/${formData.studentId}`, {
//         method: 'DELETE'
//       });

//       if (res.ok) {
//         toast.success("Student deleted");
//         fetchStudents();
//         onClose();
//       } else {
//         toast.error("Delete failed");
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Error deleting student");
//     }
//   };

//   const fields = [
//     { name: 'name', label: 'Name' },
//     { name: 'monthlyFees', label: 'Monthly Fees', type: 'number' },
//     { name: 'age', label: 'Age', type: 'number' },
//     { name: 'address', label: 'Address' },
//     { name: 'guardianName', label: 'Guardian Name' },
//     { name: 'phoneNumber', label: 'Phone Number' },
//     { name: 'altPhoneNumber', label: 'Alternate Phone' },
//     { name: 'joiningDate', label: 'Joining Date', type: 'date' },
//     { name: 'email', label: 'Email', type: 'email' },
//   ];

//   return (
//     <div className="popup-overlay">
//       <div className="popup-content">
//         <h2>Edit Student</h2>
//         <div className="form-scroll">
//           {fields.map(({ name, label, type }) => (
//             <input
//               key={name}
//               name={name}
//               type={type || "text"}
//               placeholder={label}
//               value={formData[name] || ""}
//               onChange={handleChange}
//               required
//             />
//           ))}
//         </div>
//         <div className="popup-actions">
//           <button className="btn red" onClick={handleUpdate}>Update</button>
//           <button className="btn danger" onClick={handleDelete}>Delete</button>
//           <button className="btn" onClick={onClose}>Cancel</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentPopup;













import React, { useState, useEffect } from 'react';
import './PopupStyles.css';
import { toast } from 'react-toastify';

const StudentPopup = ({ studentData, onClose, fetchStudents }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (studentData) {
      setFormData(studentData);
    }
  }, [studentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/students/update/${formData.studentId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      );
      if (res.ok) {
        toast.success('Student updated');
        fetchStudents();
        onClose();
      } else toast.error('Update failed');
    } catch (err) {
      console.error(err);
      toast.error('Error updating student');
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/students/delete/${formData.studentId}`,
        { method: 'DELETE' }
      );
      if (res.ok) {
        toast.success('Student deleted');
        fetchStudents();
        onClose();
      } else toast.error('Delete failed');
    } catch (err) {
      console.error(err);
      toast.error('Error deleting student');
    }
  };

  const fields = [
    { name: 'name', label: 'Name' },
    { name: 'monthlyFees', label: 'Monthly Fees', type: 'number' },
    { name: 'age', label: 'Age', type: 'number' },
    { name: 'address', label: 'Address' },
    { name: 'guardianName', label: 'Guardian Name' },
    { name: 'phoneNumber', label: 'Phone Number' },
    { name: 'altPhoneNumber', label: 'Alternate Phone' },
    { name: 'joiningDate', label: 'Joining Date', type: 'date' },
    { name: 'email', label: 'Email', type: 'email' },
  ];

  return (
    <div className="student-popup-overlay">
      <div className="student-popup-container">
        <h2 className="student-popup-title">Edit Student</h2>

        <div className="student-popup-form">
          {fields.map(({ name, label, type }) => (
            <input
              key={name}
              name={name}
              type={type || 'text'}
              placeholder={label}
              value={formData[name] || ''}
              onChange={handleChange}
              className="student-popup-input"
            />
          ))}
        </div>

        <div className="student-popup-buttons">
          <button className="student-btn update" onClick={handleUpdate}>Update</button>
          <button className="student-btn delete" onClick={handleDelete}>Delete</button>
          <button className="student-btn cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default StudentPopup;
