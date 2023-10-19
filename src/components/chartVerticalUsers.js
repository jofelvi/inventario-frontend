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
 const options = {
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
 const data = {
  labels,
  datasets: [
    {
      data: [0.1, 0.4 , 2, 7]
    },
  ],
};

export const ChartVerticalUsers = (props) => ({
  displayName: props.name || "",
  render() {
    return (
      <div>
        <h2>{props.title || ''}</h2>
        <Bar
          data={props.data || data}
          width={400}
          height={200}
          options={props.options || null}
        />
      </div>
    );
  }
});