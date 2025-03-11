import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function formatDate(date) {
    // Format a date to the 'en-US' locale to ensure consistent date format MM/DD/YYYY
    return new Date(date).toLocaleDateString('en-US');
}

function adjustDate(date) {
    // Adjusts the date by adding one day
    const result = new Date(date);
    result.setDate(result.getDate() + 1); // Add one day
    return formatDate(result);
}

function AppointmentsByDate() {
    const [appointments, setAppointments] = useState([]);
    const [dateFilter, setDateFilter] = useState('');
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/appointments');
            const formattedAppointments = response.data.map(app => ({
                ...app,
                date: formatDate(app.date) // Ensure all dates are formatted upon fetching
            }));
            setAppointments(formattedAppointments);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    const handleDateChange = (event) => {
        const selectedDate = adjustDate(event.target.value); // Adjust the date by adding one day
        setDateFilter(selectedDate);
        filterAppointmentsByDate(selectedDate);
    };

    const filterAppointmentsByDate = (selectedDate) => {
        if (!selectedDate) {
            setFilteredAppointments([]);
            return;
        }
        const filteredData = appointments.filter(appointment =>
            appointment.date === selectedDate
        );
        setFilteredAppointments(filteredData);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await axios.delete(`/appointments/${id}`);
                alert('Appointment deleted successfully!');
                fetchAppointments();
            } catch (error) {
                console.error('Failed to delete appointment:', error);
                alert('Failed to delete appointment.');
            }
        }
    };

    const renderAppointments = () => {
        return filteredAppointments.length === 0 ? <p>No appointments found for selected date.</p> : (
            filteredAppointments.map((appointment) => (
                <div key={appointment._id} className="card">
                    <p>Patient Name: {appointment.patientId ? appointment.patientId.name : 'Unknown Patient'}</p>
                    <p>Doctor Name: {appointment.doctorId ? appointment.doctorId.name : 'Unknown Doctor'}</p>
                    <p>Date: {appointment.date}</p>
                    <p>Status: {appointment.status}</p>
                    <Link to={`/update-appointment/${appointment._id}`} className="btn">Update</Link>
                    <button onClick={() => handleDelete(appointment._id)} className="btn-delete">Delete</button>
                </div>
            ))
        );
    };

    return (
        <div>
            <h2>View Appointments by Date</h2>
            <input
                type="date"
                onChange={handleDateChange}
                style={{ marginBottom: '20px' }}
            />
            {loading ? <p>Loading...</p> : renderAppointments()}
        </div>
    );
}

export default AppointmentsByDate;
