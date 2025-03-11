import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateAppointment() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [appointment, setAppointment] = useState({
        patientId: '',
        doctorId: '',
        date: '',
        status: ''
    });

    useEffect(() => {
        axios.get(`/appointments/${id}`)
            .then(response => {
                const { patientId, doctorId, date, status } = response.data;
                setAppointment({
                    patientId: patientId,
                    doctorId: doctorId,
                    date: new Date(date).toISOString().slice(0, 10),
                    status
                });
            })
            .catch(err => console.error(err));
    }, [id]);

    const handleChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`/appointments/${id}`, appointment)
            .then(() => {
                alert('Appointment updated successfully!');
                navigate('/appointments-list');
            })
            .catch(err => alert('Failed to update appointment: ' + err.message));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Appointment</h2>
            <label>Patient ID:<input type="text" name="patientId" value={appointment.patientId} onChange={handleChange} required /></label>
            <label>Doctor ID:<input type="text" name="doctorId" value={appointment.doctorId} onChange={handleChange} required /></label>
            <label>Date:<input type="date" name="date" value={appointment.date} onChange={handleChange} required /></label>
            <label>Status:<select name="status" value={appointment.status} onChange={handleChange} required>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select></label>
            <button type="submit">Update Appointment</button>
        </form>
    );
}

export default UpdateAppointment;
