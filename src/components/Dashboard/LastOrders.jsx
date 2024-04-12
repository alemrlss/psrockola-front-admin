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
                  {t("dashboard_table_client").toUpperCase()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_amount").toUpperCase()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_description").toUpperCase()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_createdAt").toUpperCase()}
                </TableCell>
                <TableCell sx={{ textAlign: "center" }}>
                  {" "}
                  {t("dashboard_table_type").toUpperCase()}
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id}>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.user.name}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.amountInCents / 100}$
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {formatDate(row.createdAt)}
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    {row.type === 3 && "Rockobits"}
                    {row.type === 12 && "Membresía"}
                    {row.type === 13 && "Pantalla"}
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
