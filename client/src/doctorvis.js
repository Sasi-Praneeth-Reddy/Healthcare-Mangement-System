import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

// Register the necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function SpecializationDistributionChart() {
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [{
            label: 'Number of Doctors per Specialization',
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    });
    const [totalDoctors, setTotalDoctors] = useState(0);

    // Function to process specialization data
    const processSpecializationData = (doctors) => {
        const specCounts = doctors.reduce((acc, doc) => {
            acc[doc.specialization] = (acc[doc.specialization] || 0) + 1;
            return acc;
        }, {});

        const sortedSpecCounts = Object.entries(specCounts).sort((a, b) => b[1] - a[1]);

        setChartData({
            labels: sortedSpecCounts.map(spec => spec[0]),
            datasets: [{
                ...chartData.datasets[0],
                data: sortedSpecCounts.map(spec => spec[1])
            }]
        });
        
        setTotalDoctors(doctors.length); // Update total number of doctors
    };

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await axios.get('/doctors');
                processSpecializationData(response.data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            }
        };

        fetchDoctors();
    }, []);

    return (
        <div>
            <h2>Specialization Distribution</h2>
            <h3>Total Number of Doctors: {totalDoctors}</h3> {/* Display total number of doctors */}
            <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />
        </div>
    );
}

export default SpecializationDistributionChart;
