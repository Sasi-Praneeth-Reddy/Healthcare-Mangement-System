const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');

// Create a new patient
router.post('/', async (req, res) => {
    try {
        const { name, address } = req.body;

        // Check for duplicates
        const existingPatient = await Patient.findOne({ name, address });
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient already exists.' });
        }

        const patient = new Patient(req.body);
        const newPatient = await patient.save();
        res.status(201).json(newPatient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Bulk insert patients
router.post('/bulk', async (req, res) => {
    try {
        const { patients } = req.body;

        if (!patients || !Array.isArray(patients)) {
            return res.status(400).json({ message: 'Invalid data format. Expected an array of patients.' });
        }

        const uniquePatients = [];

        for (const newPatient of patients) {
            const exists = await Patient.findOne({
                name: newPatient.name,
                address: newPatient.address
            });
            if (!exists) {
                uniquePatients.push(newPatient);
            }
        }

        if (uniquePatients.length === 0) {
            return res.status(400).json({ message: 'All patients in the file already exist.' });
        }

        const insertedPatients = await Patient.insertMany(uniquePatients);
        res.status(201).json({ message: 'Patients imported successfully', data: insertedPatients });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Failed to import patients', error: err.message });
    }
});

// Get all patients
router.get('/', async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a single patient
router.get('/:id', async (req, res) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a patient
router.put('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json(patient);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a patient
router.delete('/:id', async (req, res) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient) return res.status(404).json({ message: 'Patient not found' });
        res.json({ message: 'Patient deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
