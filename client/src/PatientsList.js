import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PatientsList() {
    const [patients, setPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        handleSearch();
    }, [searchQuery, patients]);

    const fetchPatients = async () => {
        try {
            const response = await axios.get('/patients');
            setPatients(response.data);
        } catch (error) {
            console.error('Error fetching patients:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this patient?')) {
            try {
                await axios.delete(`/patients/${id}`);
                alert('Patient deleted successfully!');
                fetchPatients();
            } catch (error) {
                console.error('Failed to delete patient:', error);
                alert('Failed to delete patient.');
            }
        }
    };

    const handleSearch = () => {
        if (searchQuery === '') {
            setFilteredPatients(patients);
        } else {
            const lowerCaseQuery = searchQuery.toLowerCase();
            const filtered = patients.filter((patient) =>
                patient.name.toLowerCase().includes(lowerCaseQuery)
            );
            setFilteredPatients(filtered);
        }
    };

    return (
        <div>
            <h2>Patients List</h2>
            <input
                type="text"
                placeholder="Search patients by name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-bar"
            />
            {filteredPatients.length > 0 ? (
                filteredPatients.map((patient) => (
                    <div key={patient._id} className="card">
                        <p>Name: {patient.name}</p>
                        <p>Age: {patient.age}</p>
                        <p>Address: {patient.address}</p>
                        <p>Medical History: {patient.medicalHistory.join(', ')}</p>
                        <p>Current Treatments: {patient.currentTreatments.join(', ')}</p>
                        <Link to={`/update-patient/${patient._id}`} className="btn">Update</Link>
                        <button onClick={() => handleDelete(patient._id)} className="btn-delete">Delete</button>
                    </div>
                ))
            ) : (
                <p>No patients found.</p>
            )}
        </div>
    );
}

export default PatientsList;
