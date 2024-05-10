import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Box,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import api from "../../../api/api";
import { formatDate } from "../../../utils/formatDate";
import { useTranslation } from "react-i18next";
import ModalTransactions from "../ModalTransactions";

function TransactionsPay() {
  const { t } = useTranslation();

  const [transactions, setTransactions] = useState([]);
  const [page, setPage] = useState(0);
  const [take, setTake] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [isMembershipChecked, setIsMembershipChecked] = useState(true);
  const [isScreenChecked, setIsScreenChecked] = useState(true);
  const [isRockobitsChecked, setIsRockobitsChecked] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [
    page,
    take,
    selectedCountry,
    isMembershipChecked,
    isScreenChecked,
    isRockobitsChecked,
  ]);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchTransactions = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/transactions/pay", {
        params: {
          skip: page * take,
          take,
          country: selectedCountry,
          membership: isMembershipChecked ? "true" : "false",
          screen: isScreenChecked ? "true" : "false",
          rockobits: isRockobitsChecked ? "true" : "false",
          rockobitsDistributor: isRockobitsChecked ? "true" : "false",
        },
      });
      setTransactions(response.data.data.transactions);
      setTotalCount(response.data.data.total);
    } catch (error) {
      console.error("Error fetching Pay transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const fetchCountries = async () => {
    try {
      const response = await api.get("/country/selects");
      setCountries(response.data.data);
    } catch (error) {
      console.error("Error fetching countries:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setTake(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCompany(null);
  };

  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    setPage(0); // Restablecer la página a 0 al cambiar de país
  };

  // Manejadores para cambiar los valores de los checkboxes
  const handleMembershipChange = (event) => {
    setIsMembershipChecked(event.target.checked);
    setPage(0); // Restablecer la página a 0 al cambiar de filtro
  };

  const handleScreenChange = (event) => {
    setIsScreenChecked(event.target.checked);
    setPage(0);
  };

  const handleRockobitsChange = (event) => {
    setIsRockobitsChecked(event.target.checked);
    setPage(0);
  };

  const renderTransactionPay = (transaction) => {
    if (transaction.type === "rockobits") {
      return (
        <TableRow key={transaction.id}>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {formatDate(transaction.createdAt)}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {t("transaction_pay_type_rockobits")} {transaction.rockobits}{" "}
            Rockobits
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {transaction.amount / 100}$
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              onClick={() => handleOpenModal(transaction.company)}
              sx={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {transaction.company.name}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (transaction.type === "membership") {
      return (
        <TableRow key={transaction.id}>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {formatDate(transaction.createdAt)}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {t("transaction_pay_type_membership")}{" "}
            {getTypeString(transaction.membership.type)}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {transaction.amount / 100}$
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              onClick={() => handleOpenModal(transaction.company)}
              sx={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {transaction.company.name}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (transaction.type === "distributor_membership") {
      return (
        <TableRow key={transaction.id}>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {formatDate(transaction.createdAt)}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {t("transaction_pay_type_membership")} (Distribuidor){" "}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {transaction.amount / 100}$
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              onClick={() => handleOpenModal(transaction.distributor)}
              sx={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {transaction.distributor.name}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
    if (transaction.type === "screen") {
      return (
        <TableRow key={transaction.id}>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {formatDate(transaction.createdAt)}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {t("transaction_pay_type_screen")} {transaction.screen.code}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {transaction.amount / 100}$
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              onClick={() => handleOpenModal(transaction.company)}
              sx={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {transaction.company.name}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }

    if (transaction.type === "distributor_rockobits") {
      return (
        <TableRow key={transaction.id}>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {formatDate(transaction.createdAt)}
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {t("transaction_pay_type_rockobits")} {transaction.rockobits}{" "}
            Rockobits (Distribuidor)
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            {transaction.amount / 100}$
          </TableCell>
          <TableCell
            sx={{
              textAlign: "center",
            }}
          >
            <Typography
              onClick={() => handleOpenModal(transaction.distributor)}
              sx={{
                cursor: "pointer",
                color: "blue",
                textDecoration: "underline",
              }}
            >
              {transaction.distributor.name}
            </Typography>
          </TableCell>
        </TableRow>
      );
    }
  };

  const getTypeString = (type) => {
    if (type === 10) {
      return "BASIC";
    }
    if (type === 20) {
      return "PLUS";
    }
    if (type === 30) {
      return "PREMIUM";
    }

    return "Unknown";
  };

  return (
    <div className="mt-4">
      <Grid container spacing={2} sx={{ mb: 2 }}>
        {/* Filtro por país */}
        <Grid item xs={12} sm={4} md={4}>
          <FormControl fullWidth variant="outlined">
            <InputLabel id="country-select-label">
              {t("select_country")}
            </InputLabel>
            <Select
              labelId="country-select-label"
              id="country-select"
              value={selectedCountry}
              onChange={handleCountryChange}
              label={t("select_country")}
            >
              <MenuItem value="">{t("all_countries")}</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        {/* Filtro por tipo de transacción */}
        <Grid item xs={12} sm={8} md={8}>
          <Grid container spacing={2}>
            {/* Checkbox de Membership */}
            <Grid item xs={4} sm={4} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isMembershipChecked}
                    onChange={handleMembershipChange}
                    sx={{
                      color: "blue",
                      "&.Mui-checked": {
                        color: "blue",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 24, // Ajusta el tamaño del icono del checkbox
                      },
                    }}
                  />
                }
                label={t("transaction_filter_membership")}
                sx={{
                  width: "100%",
                  justifyContent: "center", // Centra el checkbox y el label
                  marginBottom: 0,
                }}
              />
            </Grid>

            {/* Checkbox de Screen */}
            <Grid item xs={4} sm={4} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isScreenChecked}
                    onChange={handleScreenChange}
                    sx={{
                      color: "green",
                      "&.Mui-checked": {
                        color: "green",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 24, // Ajusta el tamaño del icono del checkbox
                      },
                    }}
                  />
                }
                label={t("transaction_filter_screen")}
                sx={{
                  width: "100%",
                  justifyContent: "center", // Centra el checkbox y el label
                  marginBottom: 0,
                }}
              />
            </Grid>

            {/* Checkbox de Rockobits */}
            <Grid item xs={4} sm={4} md={4}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isRockobitsChecked}
                    onChange={handleRockobitsChange}
                    sx={{
                      color: "red",
                      "&.Mui-checked": {
                        color: "red",
                      },
                      "& .MuiSvgIcon-root": {
                        fontSize: 24, // Ajusta el tamaño del icono del checkbox
                      },
                    }}
                  />
                }
                label={t("transaction_filter_rockobits")}
                sx={{
                  width: "100%",
                  justifyContent: "center", // Centra el checkbox y el label
                  marginBottom: 0,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {isLoading ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress size={120} />
          <Typography variant="h6" sx={{ marginTop: "16px", fontSize: "32px" }}>
            {t("loading")}
          </Typography>
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table
            aria-label="Pay Transactions Table"
            sx={{
              border: "2px solid #e0e0e0",
            }}
          >
            <TableHead
              sx={{
                backgroundColor: "#CFD1D0",
              }}
            >
              <TableRow>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {t("transaction_pay_date")}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {t("transaction_pay_type")}{" "}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {t("transaction_pay_amount")}
                </TableCell>
                <TableCell
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {t("transaction_pay_company")}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.length === 0 && !isLoading ? (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: "center" }}>
                    <Typography variant="body1">
                      {t("no_transactions_to_display")}
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                transactions.map((transaction) =>
                  renderTransactionPay(transaction)
                )
              )}
            </TableBody>
          </Table>
          <TablePagination
            component="div"
            count={totalCount}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={take}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[20, 10]}
            labelRowsPerPage={t("pagination_rows_per_page")}
            labelDisplayedRows={({ from, to, count }) =>
              `${from}-${to} ${t("pagination_of")} ${
                count !== -1 ? count : `${t("pagination_more_than")} ${to}`
              }`
            }
            nextIconButtonText={t("pagination_next")}
            backIconButtonText={t("pagination_back")}
          />
        </TableContainer>
      )}

      <ModalTransactions
        isModalOpen={isModalOpen}
        handleCloseModal={handleCloseModal}
        selectedCompany={selectedCompany}
      />
    </div>
  );
}

export default TransactionsPay;
