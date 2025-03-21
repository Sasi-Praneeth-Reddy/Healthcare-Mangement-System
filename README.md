# Healthcare Management System (HMS)

## Project Overview
The **Healthcare Management System (HMS)** is a web-based application designed to streamline patient care, medical staff management, and appointment scheduling. It replaces outdated paper-based systems and fragmented digital solutions, enhancing efficiency and improving patient outcomes.

## Features
- **Patient Management**: Securely store and manage patient information, including medical history and ongoing treatments.
- **Doctor Management**: Centralize doctor profiles, specialties, and availability.
- **Appointment Scheduling**: Enable appointment creation, tracking, reminders, and status updates.
- **CRUD Operations**: Perform Create, Read, Update, and Delete actions on patients, doctors, and appointments.
- **Search Functionalities**:
  - Search appointments by **patient name**, **doctor name**, or **date**.
  - Search doctors by **specialization**.
- **Data Visualizations**:
  - Pie chart for appointment statuses.
  - Bar chart for doctor specializations.

## Technologies Used
- **Frontend**: ReactJS
- **Backend**: Node.js
- **Database**: MongoDB

## Data Schema
### 1. Patient Collection
- `name`: Full name of the patient
- `age`: Patient’s age
- `address`: Residential address
- `medicalHistory`: Array of past diagnoses and treatments
- `currentTreatments`: Ongoing medical treatments

### 2. Doctor Collection
- `name`: Doctor’s full name
- `specialization`: Area of expertise (e.g., Cardiology, Pediatrics)
- `contactInfo`: Communication details

### 3. Appointment Collection
- `patientID`: Reference to the Patient collection
- `doctorID`: Reference to the Doctor collection
- `date`: Appointment date and time
- `status`: Appointment status (Scheduled, Completed, Cancelled)

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd healthcare-management-system
   ```
3. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   ```
4. Install dependencies for the frontend:
   ```bash
   cd ../frontend
   npm install
   ```
5. Run the backend server:
   ```bash
   cd backend
   node server.js
   ```
6. Run the frontend:
   ```bash
   cd ../frontend
   npm start
   ```

## API Endpoints
### Patients
- `GET /patients` - Retrieve all patients
- `POST /patients` - Add a new patient
- `PUT /patients/:id` - Update patient details
- `DELETE /patients/:id` - Delete a patient

### Doctors
- `GET /doctors` - Retrieve all doctors
- `POST /doctors` - Add a new doctor
- `PUT /doctors/:id` - Update doctor details
- `DELETE /doctors/:id` - Delete a doctor

### Appointments
- `GET /appointments` - Retrieve all appointments
- `POST /appointments` - Schedule a new appointment
- `PUT /appointments/:id` - Update appointment status
- `DELETE /appointments/:id` - Cancel an appointment

## Usage
- **Add a new patient or doctor** via the frontend interface.
- **Schedule, view, update, and delete appointments** using the interactive UI.
- **Search appointments and doctors** based on relevant criteria.
- **Visualize data** with pie charts and bar charts for better insights.

## Contributors
- **Sasi Praneeth Reddy Sadhu**
- INFS 740 under Professor Reza Hemayati

## License
This project is licensed under the MIT License.

# Healthcare-Management-System
