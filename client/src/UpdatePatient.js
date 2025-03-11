import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdatePatient() {
    const { id } = useParams(); // Get the patient ID from the URL
    const navigate = useNavigate();
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        address: '',
        medicalHistory: '',
        currentTreatments: ''
    });

    useEffect(() => {
        // Fetch patient details
        axios.get(`/patients/${id}`)
            .then(response => {
                setPatient(response.data); // Populate the form with existing data
            })
            .catch(error => {
                console.error('Error fetching patient data:', error);
                alert('Failed to load patient data.');
            });
    }, [id]);

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update patient details
        axios.put(`/patients/${id}`, patient)
            .then(() => {
                alert('Patient updated successfully!');
                navigate('/patients-list'); // Redirect to the patients list
            })
            .catch(error => {
                console.error('Error updating patient:', error);
                alert('Failed to update patient.');
            });
    };

    return (
        <div>
            <h2>Update Patient</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={patient.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <input
                    type="number"
                    name="age"
                    value={patient.age}
                    onChange={handleChange}
                    placeholder="Age"
                    required
                />
                <input
                    type="text"
                    name="address"
                    value={patient.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                />
                <input
                    type="text"
                    name="medicalHistory"
                    value={patient.medicalHistory}
                    onChange={handleChange}
                    placeholder="Medical History"
                />
                <input
                    type="text"
                    name="currentTreatments"
                    value={patient.currentTreatments}
                    onChange={handleChange}
                    placeholder="Current Treatments"
                />
                <button type="submit">Update Patient</button>
            </form>
        </div>
    );
}

export default UpdatePatient;
