const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    patientId: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    doctorId: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true },
    date: { type: Date, required: true },
    status: { type: String, required: true, enum: ['Scheduled', 'Completed', 'Cancelled'] }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;
