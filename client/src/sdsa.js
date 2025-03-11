import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchDoctors() {
    const [specialization, setSpecialization] = useState('');
    const [doctors, setDoctors] = useState([]);
    const [filteredDoctors, setFilteredDoctors] = useState([]);

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('/doctors');
            setDoctors(response.data);
        } catch (error) {
            console.error('Error fetching doctors:', error);
        }
    };

    const handleSearch = () => {
        if (!specialization) {
            setFilteredDoctors([]);
            alert('Please enter a specialization to search.');
            return;
        }

        const filtered = doctors.filter((doctor) =>
            doctor.specialization.toLowerCase().includes(specialization.toLowerCase())
        );
        setFilteredDoctors(filtered);

        if (filtered.length === 0) {
            alert('No doctors found with the specified specialization.');
        }
    };

    return (
        <div>
            <h2>Search Doctors by Specialization</h2>
            <div>
                <input
                    type="text"
                    placeholder="Enter specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                {filteredDoctors.map((doctor, index) => (
                    <div key={doctor._id}>
                        <div className="card">
                            <p>Name: {doctor.name}</p>
                            <p>Specialization: {doctor.specialization}</p>
                            <p>Contact Info: {doctor.contactInfo}</p>
                        </div>
                        {/* Add a line between doctors, but not after the last one */}
                        {index < filteredDoctors.length - 1 && <hr />}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SearchDoctors;
