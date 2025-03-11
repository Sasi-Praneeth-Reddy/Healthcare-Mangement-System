const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor'); 

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one doctor by id
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new doctor
router.post('/', async (req, res) => {
  try {
      const { name, contactInfo } = req.body;

      // Check for duplicates
      const existingDoctor = await Doctor.findOne({ name, contactInfo });
      if (existingDoctor) {
          return res.status(400).json({ message: 'Doctor already exists.' });
      }

      const doctor = new Doctor(req.body);
      const newDoctor = await doctor.save();
      res.status(201).json(newDoctor);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});

// Update a doctor
router.put('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a doctor
router.delete('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Bulk insert doctors
router.post('/bulk', async (req, res) => {
  try {
      const { doctors } = req.body;

      const uniqueDoctors = doctors.filter(async (newDoctor) => {
          const exists = await Doctor.findOne({
              name: newDoctor.name,
              contactInfo: newDoctor.contactInfo
          });
          return !exists;
      });

      const insertedDoctors = await Doctor.insertMany(uniqueDoctors);
      res.status(201).json({ message: 'Doctors imported successfully', data: insertedDoctors });
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to import doctors', error: err.message });
  }
});

module.exports = router;
