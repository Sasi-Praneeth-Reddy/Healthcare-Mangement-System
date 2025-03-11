import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddPatient() {
    const [patient, setPatient] = useState({
        name: '',
        age: '',
        address: '',
        medicalHistory: '',
        currentTreatments: ''
    });

    const [patients, setPatients] = useState([]);

    // Fetch existing patients
    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await axios.get('/patients');
                setPatients(response.data);
            } catch (error) {
                console.error('Failed to fetch patients:', error);
            }
        }
        fetchPatients();
    }, []);

    const handleChange = (e) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isDuplicate = patients.some(
            (p) => p.name === patient.name && p.address === patient.address
        );

        if (isDuplicate) {
            alert('This patient already exists!');
            return;
        }

        try {
            const response = await axios.post('/patients', patient);
            alert('Patient added successfully!');
            setPatients([...patients, response.data]); // Update local list
            setPatient({
                name: '',
                age: '',
                address: '',
                medicalHistory: '',
                currentTreatments: ''
            });
        } catch (error) {
            console.error('Failed to add patient:', error);
            alert('Failed to add patient');
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            alert('Please select a file.');
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const jsonData = JSON.parse(event.target.result);
                const filteredData = jsonData.filter(
                    (newPatient) =>
                        !patients.some(
                            (existingPatient) =>
                                existingPatient.name === newPatient.name &&
                                existingPatient.address === newPatient.address
                        )
                );

                if (filteredData.length === 0) {
                    alert('All patients in the file are already in the database.');
                    return;
                }

                await axios.post('/patients/bulk', { patients: filteredData });
                alert('Patients imported successfully!');
                setPatients([...patients, ...filteredData]);
            } catch (error) {
                console.error('Failed to import patients:', error);
                alert('Failed to import patients. Please ensure the JSON file is correctly formatted.');
            }
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <h2>Add Patient</h2>
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
                <button type="submit">Add Patient</button>
            </form>

            <h3>Import Patients from JSON</h3>
            <input type="file" accept=".json" onChange={handleFileUpload} />
        </div>
    );
}

export default AddPatient;
