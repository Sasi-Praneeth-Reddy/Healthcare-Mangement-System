import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddDoctor() {
    const [doctor, setDoctor] = useState({
        name: '',
        specialization: '',
        contactInfo: ''
    });
    const [doctors, setDoctors] = useState([]);

    const specializations = [
        "Allergist/Immunologist - Immune System",
        "Anesthesiologist - Pain/Anesthesia",
        "Cardiologist - Heart",
        "Colon and Rectal Surgeon - Digestive Tract",
        "Critical Care Specialist - Intensive Care",
        "Dermatologist - Skin",
        "Endocrinologist - Hormones",
        "Emergency Medicine Specialist - Emergencies",
        "Family Physician - General Health",
        "Gastroenterologist - Digestive Organs",
        "Geriatric Specialist - Elderly Care",
        "Hematologist - Blood Diseases",
        "Hospice Specialist - Palliative Care",
        "Infectious Disease Specialist - Infections",
        "Internist - Adult Medicine",
        "Medical Geneticist - Genetic Disorders",
        "Nephrologist - Kidneys",
        "Neurologist - Nervous System",
        "OB/GYN - Women's Health",
        "Oncologist - Cancer",
        "Ophthalmologist - Eyes",
        "Otolaryngologist - Ears/Nose/Throat",
        "Pathologist - Lab Analysis",
        "Pediatrician - Children",
        "Physiatrist - Physical Medicine",
        "Plastic Surgeon - Reconstructive Surgery",
        "Podiatrist - Feet",
        "Preventive Medicine Specialist - Preventive Care",
        "Psychiatrist - Mental Health",
        "Pulmonologist - Lungs",
        "Radiologist - Imaging",
        "Rheumatologist - Joints",
        "Sleep Medicine Specialist - Sleep",
        "Sports Medicine Specialist - Sports Injuries",
        "General Surgeon - Surgery",
        "Urologist - Urinary Tract"
    ];

    // Fetch existing doctors
    useEffect(() => {
        async function fetchDoctors() {
            try {
                const response = await axios.get('/doctors');
                setDoctors(response.data);
            } catch (error) {
                console.error('Failed to fetch doctors:', error);
            }
        }
        fetchDoctors();
    }, []);

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isDuplicate = doctors.some(
            (d) => d.name === doctor.name && d.contactInfo === doctor.contactInfo
        );

        if (isDuplicate) {
            alert('This doctor already exists!');
            return;
        }

        try {
            const response = await axios.post('/doctors', doctor);
            alert('Doctor added successfully!');
            setDoctors([...doctors, response.data]); // Update local list
            setDoctor({
                name: '',
                specialization: '',
                contactInfo: ''
            });
        } catch (error) {
            console.error('Failed to add doctor:', error);
            alert('Failed to add doctor');
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
                    (newDoctor) =>
                        !doctors.some(
                            (existingDoctor) =>
                                existingDoctor.name === newDoctor.name &&
                                existingDoctor.contactInfo === newDoctor.contactInfo
                        )
                );

                if (filteredData.length === 0) {
                    alert('All doctors in the file are already in the database.');
                    return;
                }

                await axios.post('/doctors/bulk', { doctors: filteredData });
                alert('Doctors imported successfully!');
                setDoctors([...doctors, ...filteredData]);
            } catch (error) {
                console.error('Failed to import doctors:', error);
                alert('Failed to import doctors. Please ensure the JSON file is correctly formatted.');
            }
        };

        reader.readAsText(file);
    };

    return (
        <div>
            <h2>Add Doctor</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    value={doctor.name}
                    onChange={handleChange}
                    placeholder="Name"
                    required
                />
                <select
                    name="specialization"
                    value={doctor.specialization}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select Specialization</option>
                    {specializations.map((specialization, index) => (
                        <option key={index} value={specialization}>
                            {specialization}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    name="contactInfo"
                    value={doctor.contactInfo}
                    onChange={handleChange}
                    placeholder="Contact Info"
                    required
                />
                <button type="submit">Add Doctor</button>
            </form>

            <h3>Import Doctors from JSON</h3>
            <input type="file" accept=".json" onChange={handleFileUpload} />
        </div>
    );
}

export default AddDoctor;
