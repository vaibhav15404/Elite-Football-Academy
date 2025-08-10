const express = require('express');
const router = express.Router();
const Student = require('../models/student');
const Fee = require('../models/Fee');


// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find().sort({ studentId: 1 });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add student
router.post('/add', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});



// Get student by ID
router.get('/:studentId', async (req, res) => {
  try {
    const student = await Student.findOne({ studentId: req.params.studentId });
    // if(!student){
    //   student = await Student.findById(req.params.studentId);
    // }
    if (!student) return res.status(404).json({ message: 'Student not found' });
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Add fee entry
router.post("/fees/add", async (req, res) => {
  const { studentId, amount, datePaid } = req.body;

  try {
    // Step 1: Check if student exists
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Step 2: Add fee
    const fee = new Fee({ studentId, amount, datePaid });
    await fee.save();

    return res.status(200).json({ message: "Fee added successfully" });
  } catch (err) {
    console.error("Error adding fee:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

// module.exports = router;

// Get fee history
router.get('/fees/:studentId', async (req, res) => {
  try {
    const fees = await Fee.find({ studentId: req.params.studentId }).sort({ date: -1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update student
router.put('/update/:studentId', async (req, res) => {
  try {
    const updated = await Student.findOneAndUpdate(
      { studentId: req.params.studentId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Student not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



// DELETE student and their fees
router.delete("/delete/:studentId", async (req, res) => {
  const { studentId } = req.params;

  try {
    const studentDeleted = await Student.deleteOne({ studentId });
    const feeDeleted = await Fee.deleteMany({ studentId });

    if (studentDeleted.deletedCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({ message: "Student and their fee history deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});


router.get('/by-email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const students = await Student.find({ email });
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
