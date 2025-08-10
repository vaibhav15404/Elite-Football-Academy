import React, { useState } from "react";
import { toast } from "react-toastify";
import "./FeePopupStyles.css";

const FeePopup = ({ feeHistory, selectedStudent, onClose, fetchStudents }) => {
  const [datePaid, setDatePaid] = useState("");
  const [amount, setAmount] = useState(selectedStudent?.monthlyFees || "");

  const handleAddFee = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/students/fees/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: selectedStudent.studentId,
          amount,
          datePaid,
        }),
      });

      if (res.ok) {
        toast.success("Fee added successfully");
        fetchStudents(); // Refresh data
        onClose();
      } else {
        toast.error("Failed to add fee");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error while adding fee");
    }
  };

  return (
    <div className="fee-popup-overlay">
      <div className="fee-popup-content">
        <h2>Fee Management - {selectedStudent?.name}</h2>

        {/* Add Fee Form on Top */}
        <div className="fee-popup-form">
          <h3>Add New Fee Payment</h3>
          <input
            type="date"
            value={datePaid}
            onChange={(e) => setDatePaid(e.target.value)}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <button className="fee-popup-btn red" onClick={handleAddFee}>
            Submit Fee
          </button>
        </div>

        {/* Fee History Below */}
        <div className="fee-popup-history">
          <h3>Fee History</h3>
          {feeHistory.length === 0 ? (
            <p>No fee history available.</p>
          ) : (
            <table className="fee-popup-table">
              <thead>
                <tr>
                  <th>Month</th>
                  <th>Amount Paid</th>
                  <th>Date Paid</th>
                </tr>
              </thead>
              <tbody>
                {feeHistory.map((fee, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(fee.datePaid).toLocaleString("default", {
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td>₹{fee.amount}</td>
                    <td>{fee.datePaid?.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="fee-popup-actions">
          <button className="fee-popup-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeePopup;
