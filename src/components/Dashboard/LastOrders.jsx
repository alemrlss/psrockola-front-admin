import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../utils/formatDate";
function LastOrders({ data }) {
  const { t } = useTranslation();

  console.log(data);

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
  const renderTypeTransaction = (transaction) => {
    if (transaction.type === "membership") {
      return (
        <TableCell sx={{ textAlign: "center" }}>
          {t("transaction_pay_type_membership")}{" "}
          {getTypeString(transaction.membership.type)}
        </TableCell>
      );
    }

    if (transaction.type === "screen") {
      return (
        <TableCell sx={{ textAlign: "center" }}>
          {t("transaction_pay_type_screen")} Screen {transaction.screen.code}
        </TableCell>
      );
    }

    if (transaction.type === "rockobits") {
      return (
        <TableCell sx={{ textAlign: "center" }}>
          {t("transaction_pay_type_rockobits")} {transaction.rockobits} Rockobits
        </TableCell>
      );
    }
  };
  return (
    <>
      <h2 className="text-xl font-bold mt-3 mb-2">
        {t("dashboard_last_orders")}
      </h2>
      <Box
        className="flex items-center"
        sx={{ display: "flex", flexDirection: "column" }}
      >
        <TableContainer className="max-w-xs lg:max-w-full">
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "#EFF0F2" }}>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_createdAt").toUpperCase()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_type").toUpperCase()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_amount").toUpperCase()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_client").toUpperCase()}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {formatDate(row.createdAt)}
                  </TableCell>
                  {renderTypeTransaction(row)}
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.amount/100}$
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.company.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default LastOrders;
