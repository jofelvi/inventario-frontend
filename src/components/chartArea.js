import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: '',
    },
  },
};

const labels = ['Octubre', 'Noviembre', 'Diciembre'];

export const data = {
  labels,
  datasets: [
    {
      data: [0.1, 0.4 , 2, 7],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};

export const ChartVerticalUsers = (props) => ({
  displayName: props.name || null,

  render() {
    return (
      <div>
        <h2>{props.title || 'titulo'}</h2>
        <Bar
          data={props.data || data}
          width={400}
          height={200}
          //options={options}
        />
      </div>
    );
  }
});