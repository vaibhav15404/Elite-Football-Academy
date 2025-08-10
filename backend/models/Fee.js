const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema({
  studentId: {
    type: String,
    required: true,
    ref: "Student",
  },
  amount: {
    type: Number,
    required: true,
  },
  datePaid: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Fee", feeSchema);
