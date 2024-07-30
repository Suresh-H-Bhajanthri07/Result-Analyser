import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const LineChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    // Extracting data for plotting
    console.log(data, 'inside line chart');
    if (!Array.isArray(data) || data.length === 0) {
      console.error('Invalid data format');
      return;
    }
    const usnArray = data.map((item) => item.usn);
    const isa1Array = data.map((item) =>
      item.marks && item.marks[0] ? item.marks[0].isa1 : null
    );
    const isa2Array = data.map((item) =>
      item.marks && item.marks[0] ? item.marks[0].isa2 : null
    );
    const esaArray = data.map((item) =>
      item.marks && item.marks[0] ? item.marks[0].esa : null
    );

    // Create or update the line chart
    const ctx = document.getElementById('lineChart')?.getContext('2d');
    if (!ctx) {
      console.error('Canvas context not found');
      return;
    }

    // Destroy the previous chart instance
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart instance
    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: usnArray,
        datasets: [
          {
            label: 'ISA1',
            borderColor: 'rgba(255, 0, 0, 1)',
            data: isa1Array,
            fill: false,
          },
          {
            label: 'ISA2',
            borderColor: 'rgba(0, 255, 0, 1)',
            data: isa2Array,
            fill: false,
          },
          {
            label: 'ESA',
            borderColor: 'rgba(0, 0, 255, 1)',
            data: esaArray,
            fill: false,
          },
        ],
      },
      options: {
        responsive: false,
        maintainAspectRatio: false,
      },
    });
  }, [data]);

  return <canvas id="lineChart" width="1400" height="800"></canvas>;
};

export default LineChart;
