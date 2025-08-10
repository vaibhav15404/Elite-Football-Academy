import React, { useState } from "react";
import { toast } from "react-toastify";
import FeePopup from "./FeePopup";
import StudentPopup from "./StudentPopup";
import "./StudentTable.css";

const StudentTable = ({ students, fetchStudents }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [feePopup, setFeePopup] = useState(false);
  const [feeHistory, setFeeHistory] = useState([]);

  const handleFeeHistory = async (student) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/students/fees/${student.studentId}`
      );
      const data = await res.json();
      setFeeHistory(data);
      setSelectedStudent(student);
      setFeePopup(true);
    } catch (err) {
      toast.error("Failed to load fee history");
    }
  };

  return (
    <div className="students-table">
      <h2 className="table-title">Student Records</h2>
      <div className="table-wrapper">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
              <th>Monthly Fee</th>
              <th>Guardian</th>
              <th>Phone</th>
              <th>Alt. Phone</th>
              <th>Joining Date</th>
              <th>Email</th>
              <th>Address</th>
              <th>Fee History</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="11" className="no-data">No records available</td>
              </tr>
            ) : (
              students.map((student, index) => (
                <tr
                  key={student.studentId}
                  className={index % 2 === 0 ? "row-even" : "row-odd"}
                  onClick={() => {
                    setSelectedStudent(student);
                    setShowPopup(true);
                  }}
                >
                  <td>{student.studentId}</td>
                  <td>{student.name}</td>
                  <td>{student.age}</td>
                  <td>₹{student.monthlyFees}</td>
                  <td>{student.guardianName}</td>
                  <td>{student.phoneNumber}</td>
                  <td>{student.altPhoneNumber}</td>
                  <td>{student.joiningDate?.split("T")[0]}</td>
                  <td>{student.email}</td>
                  <td>{student.address}</td>
                  <td>
                    <button
                      className="view-fee-btn"
                      onClick={(e) => {
                        e.stopPropagation(); // prevent row click
                        handleFeeHistory(student);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Fee History Popup */}
      {feePopup && (
        <FeePopup
          feeHistory={feeHistory}
          selectedStudent={selectedStudent}
          onClose={() => setFeePopup(false)}
          fetchStudents={fetchStudents}
        />
      )}

      {/* Student Edit Popup */}
      {showPopup && selectedStudent && (
        <StudentPopup
          studentData={selectedStudent}
          onClose={() => setShowPopup(false)}
          fetchStudents={fetchStudents}
        />
      )}
    </div>
  );
};

export default StudentTable;
