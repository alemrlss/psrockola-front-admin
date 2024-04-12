import Grid from "@mui/material/Grid";
import { Doughnut } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);
Chart.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Graphics({ data }) {
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
  const months = data.transactionsByMonth.map((item) => item.month);
  const totalAmounts = data.transactionsByMonth.map(
    (item) => item.totalamount / 100
  );

  console.log(totalAmounts);
  console.log(months);
  const barData = {
    labels: months,

    datasets: [
      {
        label: "Ventas Rockobits",
        data: totalAmounts,
        backgroundColor: [
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
          "rgba(173, 136, 241, 0.8)",
        ],
        borderColor: [
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
          "rgba(173, 136, 241, 1)",
        ],
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
