import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast, ToastContainer } from "react-toastify";
import "./YourChild.css";
import {  useNavigate } from "react-router-dom";

const YourChild = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    guardianName: "",
    email: "",
    altPhoneNumber: "",
    dob: "",
    address: ""
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const decoded = jwtDecode(token);
    const userId = decoded.id;

    const getEmailAndStudents = async () => {
      try {
        const emailRes = await fetch(
          `${process.env.REACT_APP_API_URL}/user/email/${userId}`
        );
        const { email } = await emailRes.json();
        setEmail(email);

        const studentRes = await fetch(
          `${process.env.REACT_APP_API_URL}/students/by-email/${email}`
        );
        const studentData = await studentRes.json();
        setStudents(studentData);
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    getEmailAndStudents();
  }, []);

  const handleEditClick = (student) => {
    setEditingStudent(student);
    setFormData({
      guardianName: student.guardianName || "",
      email: student.email || "",
      altPhoneNumber: student.altPhoneNumber || "",
      dob: student.dob?.split("T")[0] || "",
      address: student.address || "",
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleUpdate = async () => {
  //   try {
  //     const response = await fetch(`${process.env.REACT_APP_API_URL}/students/update/${editingStudent.studentId}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!response.ok) throw new Error("Failed to update student");

  //     const updated = await response.json();
  //     const updatedList = students.map((s) =>
  //       s._id === updated._id ? updated : s
  //     );
  //     setStudents(updatedList);
  //     setEditingStudent(null);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  const handleUpdate = async () => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/students/update/${editingStudent.studentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) throw new Error("Failed to update student");

    const updated = await response.json();
    const updatedList = students.map((s) =>
      s._id === updated._id ? updated : s
    );
    setStudents(updatedList);
    setEditingStudent(null);
    toast.success("Student updated successfully");
  } catch (err) {
    console.error(err);
    toast.error("Error updating student");
  }
};


  if (loading) return <div className="your-child-container">Loading...</div>;

  if (students.length === 0)
    return <div className="your-child-container">No children found for {email}</div>;

  return (
    <div className="your-child-container">
    <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="your-child-title">Your Children</h2>
      <div className="your-child-cards">
        {students.map((student) => (
          <div key={student._id} className="your-child-card">
            <p><strong>Roll No:</strong> {student.studentId}</p>
            <p><strong>Name:</strong> {student.name}</p>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>DOB:</strong> {student.dob?.split("T")[0]}</p>
            <p><strong>Guardian:</strong> {student.guardianName}</p>
            <p><strong>Joining Date:</strong> {student.joiningDate?.split("T")[0]}</p>
            <p><strong>Monthly Fees:</strong> ₹{student.monthlyFees}</p>
            <p><strong>Phone no.:</strong> {student.phoneNumber}</p>
            <p><strong>Alt Phone no.:</strong> {student.altPhoneNumber || "N/A"}</p>
            <p><strong>Email:</strong> {student.email}</p>
            <p><strong>Address:</strong> {student.address || "N/A"}</p>
            <div className="child-buttons">
              <button onClick={() => handleEditClick(student)} className="edit-btn">Edit</button>
              <button className="pay-btn" onClick={() => navigate(`/pay-fees/${student.studentId}`)}>
                Pay Fees
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Edit */}
      {editingStudent && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Student Info</h3>
            <label>Guardian Name</label>
            <input name="guardianName" value={formData.guardianName} onChange={handleChange} />
            <label>Email</label>
            <input name="email" value={formData.email} onChange={handleChange} />
            <label>Alternate Phone</label>
            <input name="altPhoneNumber" value={formData.altPhoneNumber} onChange={handleChange} />
            <label>Date of Birth</label>
            <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
            <label>Address</label>
            <textarea name="address" value={formData.address} onChange={handleChange} />
            <div className="modal-buttons">
              <button className="update-btn" onClick={handleUpdate}>Update</button>
              <button className="cancel-btn" onClick={() => setEditingStudent(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default YourChild;
