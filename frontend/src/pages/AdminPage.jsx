import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddStudentPopup from "../components/AddStudentPopup";
import SearchBar from "../components/SearchBar";
import StudentTable from "../components/StudentTable";

const AdminPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      toast.error("Failed to load students");
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="admin-container">
      <ToastContainer position="top-right" autoClose={3000} />

      <button onClick={() => setShowAddPopup(true)} className="add-student-btn">
        Add Student
      </button>

      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <StudentTable
        students={filteredStudents}
        fetchStudents={fetchStudents}
      />

      {showAddPopup && (
        <AddStudentPopup
          setShowAddPopup={setShowAddPopup}
          fetchStudents={fetchStudents}
        />
      )}
    </div>
  );
};

export default AdminPage;
