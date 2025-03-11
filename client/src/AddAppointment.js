import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddAppointment() {
    const [appointment, setAppointment] = useState({
        patientId: '',
        doctorId: '',
        date: '',
        status: 'Scheduled'
    });
    const [patients, setPatients] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setLoading(true);
        const fetchDoctorsAndPatients = async () => {
            try {
                const resPatients = await axios.get('/patients');
                const resDoctors = await axios.get('/doctors');
                setPatients(resPatients.data);
                setDoctors(resDoctors.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };
        fetchDoctorsAndPatients();
    }, []);

    const handleChange = (e) => {
        setAppointment({ ...appointment, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!appointment.patientId || !appointment.doctorId) {
            alert('Please select both a patient and a doctor.');
            return;
        }
        try {
            const response = await axios.post('/appointments', appointment);
            alert('Appointment added successfully!');
            console.log(response.data);
            setAppointment({
                patientId: '',
                doctorId: '',
                date: '',
                status: 'Scheduled'
            });
        } catch (error) {
            console.error('Failed to add appointment:', error);
            alert('Failed to add appointment: ' + (error.response?.data?.message || error.message));
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>Add Appointment</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="patientId">Patient:</label>
                <select
                    name="patientId"
                    value={appointment.patientId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Patient</option>
                    {patients.map((patient) => (
                        <option key={patient._id} value={patient._id}>
                            {patient.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="doctorId">Doctor:</label>
                <select
                    name="doctorId"
                    value={appointment.doctorId}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                        <option key={doctor._id} value={doctor._id}>
                            {doctor.name}
                        </option>
                    ))}
                </select>

                <label htmlFor="date">Date:</label>
                <input
                    type="date"
                    name="date"
                    value={appointment.date}
                    onChange={handleChange}
                    required
                />

                <label htmlFor="status">Status:</label>
                <select
                    name="status"
                    value={appointment.status}
                    onChange={handleChange}
                    required
                >
                    <option value="Scheduled">Scheduled</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <button type="submit">Add Appointment</button>
            </form>
        </div>
    );
}

export default AddAppointment;
