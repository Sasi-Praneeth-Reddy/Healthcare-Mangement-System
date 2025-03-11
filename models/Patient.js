const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    medicalHistory: [{ type: String }],
    currentTreatments: [{ type: String }]
});

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;
