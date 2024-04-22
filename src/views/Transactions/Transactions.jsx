import { Box, Typography } from "@mui/material";
import TransactionsPay from "../../components/Transactions/Pay/TransactionsPay";

function TransactionsView() {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Payment Transactions
      </Typography>
      <TransactionsPay />
    </Box>
  );
}

export default TransactionsView;
