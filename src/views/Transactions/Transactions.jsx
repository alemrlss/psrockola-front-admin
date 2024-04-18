import { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import api from "../../api/api";
import { formatDate } from "../../utils/formatDate";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [totalTransactions, setTotalTransactions] = useState(0);
  const [filterType, setFilterType] = useState(null); // Estado para el tipo de filtro

  useEffect(() => {
    loadTransactions();
  }, [page, rowsPerPage, filterType]); // Load transactions when page, rowsPerPage, or filterType change

  const loadTransactions = async () => {
    try {
      const response = await api.get("transactions", {
        params: {
          skip: page * rowsPerPage,
          take: rowsPerPage,
          filterType: filterType, // Enviar el tipo de filtro como query parameter
        },
      });
      const { transactions, total } = response.data.data;
      setTransactions(transactions);
      setTotalTransactions(total);
    } catch (error) {
      console.error("Error loading transactions:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset page to 0 when rowsPerPage changes
  };

  const handleFilter = (type) => {
    setFilterType(type); // Actualizar el estado del tipo de filtro al hacer clic en un botón
    setPage(0); // Reiniciar la página al cambiar el tipo de filtro
  };

  return (
    <div>
      <h2 className="text-2xl">Transactions</h2>
      <div>
        <Button variant="contained" onClick={() => handleFilter(null)}>All</Button>
        <Button variant="contained" onClick={() => handleFilter("rockobits")}>Rockobits</Button>
        <Button variant="contained" onClick={() => handleFilter("memberships")}>Memberships</Button>
        <Button variant="contained" onClick={() => handleFilter("screens")}>Screens</Button>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[20]}
        component="div"
        count={totalTransactions}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Transactions;
