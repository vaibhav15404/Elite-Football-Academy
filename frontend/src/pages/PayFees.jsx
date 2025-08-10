import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PayFees.css";
import { toast, ToastContainer } from "react-toastify";
import imageUrl from "../assets/Payment-qr.jpg"; // Adjust the path as necessary

const PayFees = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [amount, setAmount] = useState("");
  const [datePaid, setDatePaid] = useState("");

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        console.log(`Fetching student with ID: ${studentId}`);
        const res = await fetch(`${process.env.REACT_APP_API_URL}/students/${studentId}`);
        const data = await res.json();
        console.log(data);
        setStudent(data);
        setAmount(data.monthlyFees || 2000);
        setDatePaid(new Date().toISOString().split("T")[0]);
      } catch (err) {
        console.error(err);
        toast.error("Error fetching student details");
      }
    };

    fetchStudent();
  }, [studentId]);

  const handleConfirmPayment = async () => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/fees/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: student.studentId,
          amountPaid: amount,
          datePaid,
        }),
      });

      if (!res.ok) throw new Error("Payment failed");
      toast.success("Fee payment recorded successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to record payment");
    }
  };

  if (!student) return <div className="pay-fees-container">Loading...</div>;

  return (
    <div className="pay-fees-container">
      <ToastContainer />
      <h2>Pay Fees for {student.name}</h2>
      <div className="pay-fees-card">
        <img src={imageUrl} className="qr-code" />
        <div className="fee-details">
          <p><strong>UPI ID:</strong> elitefootballacademy@upi</p>
          <p><strong>Phone:</strong> +91 7014756832</p>
          <p><strong>Bank:</strong> Elite Bank</p>
          <p><strong>IFSC:</strong> EFA123456</p>
          <p><strong>Account Holder:</strong> Elite Football Academy</p>
        </div>
        <div className="fee-form">
          <label>Amount</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
          <label>Date Paid</label>
          <input type="date" value={datePaid} onChange={(e) => setDatePaid(e.target.value)} />
          <button onClick={handleConfirmPayment}>Confirm Payment</button>
        </div>
      </div>
    </div>
  );
};

export default PayFees;
