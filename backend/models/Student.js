// // models/student.js
// const mongoose = require('mongoose');

// const studentSchema = new mongoose.Schema({
//   studentId: { type: String, unique: true, required: true }, // roll number
//   name: String,
//   age: Number,
//   monthlyFees: {
//     type: Number,
//     required: true,
//   },
//   address: String,
//   guardianName: String,
//   phoneNumber: String,
//   altPhoneNumber: String,
//   joiningDate: Date,
//   email: String,
// });

// module.exports = mongoose.model('Student', studentSchema);


// models/student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  studentId: { type: String, unique: true, required: true },
  name: String,
  dob: Date, // <-- Added Date of Birth
  age: Number, // Will be auto-calculated
  monthlyFees: { type: Number, required: true },
  address: String,
  guardianName: String,
  phoneNumber: String,
  altPhoneNumber: String,
  joiningDate: Date,
  email: String,
});

// Calculate age before saving
studentSchema.pre('save', function (next) {
  if (this.dob) {
    const ageDiffMs = Date.now() - this.dob.getTime();
    const ageDate = new Date(ageDiffMs);
    this.age = Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  next();
});

module.exports = mongoose.model('Student', studentSchema);
