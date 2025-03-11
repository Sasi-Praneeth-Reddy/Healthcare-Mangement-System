import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearched, setIsSearched] = useState(false);
    const [totalScheduled, setTotalScheduled] = useState(0);
    const [totalCompleted, setTotalCompleted] = useState(0);
    const [totalCancelled, setTotalCancelled] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        setLoading(true);
        try {
            const response = await axios.get('/appointments');
            setAppointments(response.data);
            countAppointmentStatuses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching appointments:', error);
            setLoading(false);
        }
    };

    const countAppointmentStatuses = (appointmentList) => {
        const scheduled = appointmentList.filter(a => a.status === 'Scheduled').length;
        const completed = appointmentList.filter(a => a.status === 'Completed').length;
        const Cancelled = appointmentList.filter(a => a.status === 'Cancelled').length;

        setTotalScheduled(scheduled);
        setTotalCompleted(completed);
        setTotalCancelled(Cancelled);
    };

    const handleSearch = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setIsSearched(true);
    
        if (value === '') {
            setFilteredAppointments([]);
            countAppointmentStatuses(appointments);  // Recount statuses based on all appointments
        } else {
            const filteredData = appointments.filter(appointment =>
                appointment.patientId && appointment.patientId.name.toLowerCase().includes(value)
            );
            setFilteredAppointments(filteredData);
            countAppointmentStatuses(filteredData);  // Recount statuses based on filtered appointments
        }
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
        return isSearched && (filteredAppointments.length === 0 ? <p>No appointments found.</p> : (
            filteredAppointments.map((appointment) => (
                <div key={appointment._id} className="card">
                    <p>Patient Name: {appointment.patientId ? appointment.patientId.name : 'Unknown Patient'}</p>
                    <p>Doctor Name: {appointment.doctorId ? appointment.doctorId.name : 'Unknown Doctor'}</p>
                    <p>Date: {appointment.date ? new Date(appointment.date).toLocaleDateString() : 'No Date'}</p>
                    <p>Status: {appointment.status}</p>
                    <Link to={`/update-appointment/${appointment._id}`} className="btn">Update</Link>
                    <button onClick={() => handleDelete(appointment._id)} className="btn-delete">Delete</button>
                </div>
            ))
        ));
    };

    return (
        <div>
            <h2>Search Appointments by Patient Name</h2>
            <input
                type="text"
                placeholder="Search by Patient name"
                value={searchTerm}
                onChange={handleSearch}
                style={{ marginBottom: '20px' }}
            />
            <div className="summary">
                <p>Total Scheduled: {totalScheduled}</p>
                <p>Total Completed: {totalCompleted}</p>
                <p>Total Cancelled: {totalCancelled}</p>
            </div>
            {loading ? <p>Loading...</p> : renderAppointments()}
        </div>
    );
}

export default AppointmentsList;
