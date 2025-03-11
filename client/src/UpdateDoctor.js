import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateDoctor() {
    const { id } = useParams(); // Get the doctor ID from the URL
    const navigate = useNavigate();
    const [doctor, setDoctor] = useState({
        name: '',
        specialization: '',
        availability: '',
        contactInfo: ''
    });

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

    useEffect(() => {
        // Fetch doctor details
        axios.get(`/doctors/${id}`)
            .then(response => {
                setDoctor(response.data); // Populate the form with existing data
            })
            .catch(error => {
                console.error('Error fetching doctor data:', error);
                alert('Failed to load doctor data.');
            });
    }, [id]);

    const handleChange = (e) => {
        setDoctor({ ...doctor, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Update doctor details
        axios.put(`/doctors/${id}`, doctor)
            .then(() => {
                alert('Doctor updated successfully!');
                navigate('/doctors-list'); // Redirect to the doctors list
            })
            .catch(error => {
                console.error('Error updating doctor:', error);
                alert('Failed to update doctor.');
            });
    };

    return (
        <div>
            <h2>Update Doctor</h2>
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
                <button type="submit">Update Doctor</button>
            </form>
        </div>
    );
}

export default UpdateDoctor;
