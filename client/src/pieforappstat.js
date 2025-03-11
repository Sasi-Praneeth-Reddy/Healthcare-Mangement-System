import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import './App.css'; // Ensure your CSS file is imported

// Register the necessary plugins for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

function AppointmentsList() {
    const [summary, setSummary] = useState({ scheduled: 0, completed: 0, cancelled: 0 });

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get('/appointments');
                const data = response.data;

                // Calculate summary counts
                const scheduledCount = data.filter(appointment => appointment.status === 'Scheduled').length;
                const completedCount = data.filter(appointment => appointment.status === 'Completed').length;
                const cancelledCount = data.filter(appointment => appointment.status === 'Cancelled').length;

                setSummary({
                    scheduled: scheduledCount,
                    completed: completedCount,
                    cancelled: cancelledCount
                });
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const data = {
        labels: ['Scheduled', 'Completed', 'Cancelled'],
        datasets: [
            {
                label: 'Appointment Status',
                data: [summary.scheduled, summary.completed, summary.cancelled],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="chart-container">
            <h2>Appointments Summary</h2>
            <div className="chart-scale">
                <Pie data={data} />
            </div>
        </div>
    );
}

export default AppointmentsList;
