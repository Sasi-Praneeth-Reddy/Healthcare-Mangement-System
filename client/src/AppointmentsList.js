import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [summary, setSummary] = useState({ scheduled: 0, completed: 0, Cancelled: 0 });

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('/appointments');
            const data = response.data;

            // Calculate summary counts
            const scheduledCount = data.filter(appointment => appointment.status === 'Scheduled').length;
            const completedCount = data.filter(appointment => appointment.status === 'Completed').length;
            const CancelledCount = data.filter(appointment => appointment.status === 'Cancelled').length;

            setAppointments(data);
            setSummary({
                scheduled: scheduledCount,
                completed: completedCount,
                Cancelled: CancelledCount
            });
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this appointment?')) {
            try {
                await axios.delete(`/appointments/${id}`);
                alert('Appointment deleted successfully!');
                fetchAppointments(); // Refresh the appointments list
            } catch (error) {
                console.error('Failed to delete appointment:', error);
                alert('Failed to delete appointment.');
            }
        }
    };

    return (
        <div>
            <h2>Appointments List</h2>

            {/* Summary Section */}
            <div className="summary">
                <p>Total Scheduled: {summary.scheduled}</p>
                <p>Total Completed: {summary.completed}</p>
                <p>Total Cancelled: {summary.Cancelled}</p>
            </div>

            {appointments.length === 0 && <p>No appointments found.</p>}
            {appointments.map((appointment) => (
                <div key={appointment._id} className="card">
                    <p>Patient Name: {appointment.patientId ? appointment.patientId.name : 'Unknown Patient'}</p>
                    <p>Doctor Name: {appointment.doctorId ? appointment.doctorId.name : 'Unknown Doctor'}</p>
                    <p>Date: {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'No Date'}</p>
                    <p>Status: {appointment.status}</p>
                    <Link to={`/update-appointment/${appointment._id}`} className="btn">Update</Link>
                    <button onClick={() => handleDelete(appointment._id)} className="btn-delete">Delete</button>
                </div>
            ))}
        </div>
    );
}

export default AppointmentsList;
