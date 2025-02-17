import React from 'react';
import { Line } from 'react-chartjs-2';
import { Box, Typography } from '@mui/material';

export const ApplicationTrends = ({ data }) => {
  const chartData = {
    labels: data.map(d => d.date),
    datasets: [
      {
        label: 'Applications',
        data: data.map(d => d.count),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Application Trends',
      },
    },
  };

  return (
    <Box>
      <Typography variant="h6" mb={2}>Application Trends</Typography>
      <Line data={chartData} options={options} />
    </Box>
  );
};