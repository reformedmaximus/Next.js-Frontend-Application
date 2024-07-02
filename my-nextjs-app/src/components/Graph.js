import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Graph = ({ data }) => {
    const chartData = {
        labels: data.map(post => post.id),
        datasets: [
            {
                label: 'Post Length',
                data: data.map(post => post.body.length),
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                borderColor: 'rgba(255, 255, 255, 1)',
                borderWidth: 1,
                
            },
        ],
    }; 
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: {
                     color: '#fff',
                },
            },
            title: {
                display: true,
                text: 'Post Body Length Distribution',
                color: '#fff', 
            },
        },
    
    scales: {
        x: {
            ticks: {
                color: '#fff',
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Adjust the grid line color if needed
            },
        },
        y: {
            ticks: {
                color: '#fff',
            },
            grid: {
                color: 'rgba(255, 255, 255, 0.2)', // Adjust the grid line color if needed
            },
        },
    },
};

    return <Bar data={chartData} options={options} />;

};

export default Graph;
