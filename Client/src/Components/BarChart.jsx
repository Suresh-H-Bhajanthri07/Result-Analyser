import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ marks }) => {
  const [datamarks, setDatamarks] = useState();

  useEffect(() =>{
    setDatamarks(marks);
  }, [marks])

  const data = {
    labels: ['ISA1', 'ISA2', 'ESA'],
    datasets: [
      {
        label: 'Values',
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(75, 192, 192, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
        data: [datamarks?.isa1, datamarks?.isa2, datamarks?.esa],
      },
    ],
  };
  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Bar Chart</h2>
      {datamarks && <Bar data={data} options={options} />}
    </div>
  );
};

export default BarChart;
