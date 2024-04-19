import { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { FaMoneyBillWave, FaCoins, FaQrcode } from "react-icons/fa";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import TransactionsRockobits from "../../components/Transactions/Rockobits/TransactionsRockobits";
import TransactionsPay from "../../components/Transactions/Pay/TransactionsPay";
import TransactionsQr from "../../components/Transactions/Qr/TransactionsQr";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#555CB3", // Color morado para los labels y el indicador
    },
  },
});

function TransactionsTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
          indicatorColor="primary" // Cambia el color del indicador a morado
          textColor="primary" // Cambia el color de los labels a morado
          sx={{
            ".MuiTab-labelIcon": {
              fontSize: "1.2rem", // Cambia el tamaño de letra según tus preferencias
            },
          }}
        >
          <Tab icon={<FaCoins />} label="Rockobits" />
          <Tab icon={<FaMoneyBillWave />} label="Pay" />
          <Tab icon={<FaQrcode />} label="QR" />
        </Tabs>
        <div>
          {value === 0 && (
            <Box>
              <TransactionsRockobits />
            </Box>
          )}
          {value === 1 && (
            <Box>
              <TransactionsPay />
            </Box>
          )}
          {value === 2 && (
            <Box>
              <TransactionsQr />
            </Box>
          )}
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default TransactionsTabs;
