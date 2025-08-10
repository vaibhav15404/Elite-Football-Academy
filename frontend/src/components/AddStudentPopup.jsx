import React, { useState } from "react";
import { toast } from "react-toastify";
import "./AddStudentPopup.css";

const AddStudentPopup = ({ setShowAddPopup, fetchStudents }) => {
  const [studentData, setStudentData] = useState({
    studentId: "",
    name: "",
    dob: "", // Date of Birth
    address: "",
    guardianName: "",
    phoneNumber: "",
    altPhoneNumber: "",
    joiningDate: "",
    email: "",
    monthlyFees: "",
  });

  const handleChange = (e) => {
    setStudentData({ ...studentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/students/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(studentData),
      });

      if (res.ok) {
        toast.success("Student added successfully");
        fetchStudents();
        setShowAddPopup(false);
      } else {
        toast.error("Failed to add student");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error adding student");
    }
  };

  return (
    <div className="student-popup-overlay">
      <div className="student-popup-content">
        <h2>Add New Student</h2>

        <div className="student-popup-form-scroll">
          {Object.keys(studentData).map((key) => (
            <div className="student-input-group" key={key}>
              <label htmlFor={key}>
                {key === "dob" ? "Date of Birth" : key.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                id={key}
                name={key}
                type={key.includes("Date") || key === "dob" ? "date" : "text"}
                value={studentData[key]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="student-popup-actions">
          <button className="student-popup-btn red" onClick={handleSubmit}>
            Submit
          </button>
          <button className="student-popup-btn" onClick={() => setShowAddPopup(false)}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddStudentPopup;
