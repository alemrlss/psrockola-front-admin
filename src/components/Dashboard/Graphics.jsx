import React from "react";
import Grid from "@mui/material/Grid";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useState } from "react";

Chart.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

function Graphics({ data }) {
  const [transactionsLast6Months, setTransactionsLast6Months] = useState(
    data.transactionsByMonth
  );

  const chartDataSet = {
    labels: ["Basico", "Plus", "Premium"],
    datasets: [
      {
        data: [data.basicMembers, data.plusMembers, data.premiumMembers],
        backgroundColor: ["#C58FC1", "#9772BA", "#555CB3"],
        hoverBackgroundColor: ["#C58FC1", "#9772BA", "#555CB3"],
      },
    ],
  };

  const barData = {
    labels: transactionsLast6Months.map(
      (item) => `${item.month} - ${item.year}`
    ),
    datasets: [
      {
        label: "Sales per month rockobits ($)",
        data: transactionsLast6Months.map((item) => item.totalSales / 100),
        backgroundColor: "rgba(173, 136, 241, 0.8)",
        borderColor: "rgba(173, 136, 241, 1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: "4px" }}>
      <Grid item xs={12} md={9}>
        {/* Contenedor que mide 3/4 del ancho */}
        <Bar
          data={barData}
          height={200}
          options={{
            maintainAspectRatio: false, // Esto permite al contenedor ajustarse al tamaño disponible
            plugins: {
              legend: { display: true, position: "top" },
              tooltip: { enabled: true, padding: 16 },
            },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </Grid>
      <Grid item xs={12} md={3}>
        {/* Contenedor que mide 1/4 del ancho */}
        <Doughnut
          data={chartDataSet}
          height={200}
          options={{
            cutout: "50%",
            maintainAspectRatio: false, // Esto permite al contenedor ajustarse al tamaño disponible
            plugins: {
              legend: { display: true, position: "bottom" },
              tooltip: { enabled: true, padding: 16 },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

export default Graphics;
