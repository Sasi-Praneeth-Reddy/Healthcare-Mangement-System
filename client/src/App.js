import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './global.css';
import Homepage from './Homepage';

import AddAppointment from './AddAppointment';
import AddDoctor from './AddDoctor';
import AddPatient from './AddPatient';
import AppointmentsList from './AppointmentsList';
import DoctorsList from './DoctorsList';
import PatientsList from './PatientsList';
import UpdateAppointment from './UpdateAppointment';
import UpdateDoctor from './UpdateDoctor';
import UpdatePatient from './UpdatePatient';
import SearchAppointments from './SearchAppointments';
import SearchAppointmentsbydoc from './searchappointbydoc';
import Searchappointmentsbydate from './sbmh';
import SearchDoctorsBySpecialization from './sdsa';
import AppointmentsStatusPieChart from './pieforappstat';
import SpecializationDistributionChart from './doctorvis'; // Import the new component

function App() {
    return (
        <Router>
            <div>
                <header className="header">Healthcare Management System</header>
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/add-appointment">Add Appointment</Link>
                    <Link to="/add-doctor">Add Doctor</Link>
                    <Link to="/add-patient">Add Patient</Link>
                    <Link to="/appointments-list">Appointments</Link>
                    <Link to="/doctors-list">Doctors</Link>
                    <Link to="/patients-list">Patients</Link>
                    <div className="dropdown">
                        <button className="dropbtn">Search</button>
                        <div className="dropdown-content">
                            <Link to="/search-appointments">Appointments by Patient Name</Link>
                            <Link to="/search-appointments-by-doc">Appointments by Doctor Name</Link>
                            <Link to="/search-appointments-by-date">Appointments by Date</Link>
                            <Link to="/search-doctors-by-specialization">Search Doctors by Specialization</Link>
                        </div>
                    </div>
                    <div className="dropdown">
                        <button className="dropbtn">Visualization</button>
                        <div className="dropdown-content">
                            <Link to="/appointments-status-chart">Appointment Status Chart</Link>
                            <Link to="/doctor-specialization-chart">Doctor Specialization Chart</Link>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <Routes>
                    <Route path="/" element={<Homepage />} /> {/* Homepage route */}
                        <Route path="/add-appointment" element={<AddAppointment />} />
                        <Route path="/add-doctor" element={<AddDoctor />} />
                        <Route path="/add-patient" element={<AddPatient />} />
                        <Route path="/appointments-list" element={<AppointmentsList />} />
                        <Route path="/doctors-list" element={<DoctorsList />} />
                        <Route path="/patients-list" element={<PatientsList />} />
                        <Route path="/update-appointment/:id" element={<UpdateAppointment />} />
                        <Route path="/update-doctor/:id" element={<UpdateDoctor />} />
                        <Route path="/update-patient/:id" element={<UpdatePatient />} />
                        <Route path="/search-appointments" element={<SearchAppointments />} />
                        <Route path="/search-appointments-by-doc" element={<SearchAppointmentsbydoc />} />
                        <Route path="/search-appointments-by-date" element={<Searchappointmentsbydate />} />
                        <Route path="/search-doctors-by-specialization" element={<SearchDoctorsBySpecialization />} />
                        <Route path="/appointments-status-chart" element={<AppointmentsStatusPieChart />} />
                        <Route path="/doctor-specialization-chart" element={<SpecializationDistributionChart />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
