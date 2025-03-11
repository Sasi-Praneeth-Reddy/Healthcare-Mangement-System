import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function DoctorsList() {
    const [doctors, setDoctors] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, doctors]);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this doctor?')) {
            try {
                await axios.delete(`/doctors/${id}`);
                alert('Doctor deleted successfully!');
                fetchDoctors();
            } catch (error) {
                console.error('Failed to delete doctor:', error);
                alert('Failed to delete doctor.');
            }
        }
    };

    const handleSearch = () => {
        if (searchQuery === '') {
            setFilteredDoctors(doctors);
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = doctors.filter((doctor) =>
                doctor.name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredDoctors(filtered);
        }
    };

    return (
        <div>
            <h2>Doctors List</h2>
            <input
                type="text"
                placeholder="Search doctors by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            {filteredDoctors.length > 0 ? (
                filteredDoctors.map((doctor) => (
                    <div key={doctor._id} className="card">
                        <p>Name: {doctor.name}</p>
                        <p>Specialization: {doctor.specialization}</p>
                        <p>Contact Info: {doctor.contactInfo}</p>
                        <Link to={`/update-doctor/${doctor._id}`} className="btn">Update</Link>
                        <button onClick={() => handleDelete(doctor._id)} className="btn-delete">Delete</button>
                    </div>
                ))
            ) : (
                <p>No doctors found.</p>
            )}
        </div>
    );
}

export default DoctorsList;
