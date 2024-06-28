/* eslint-disable react/prop-types */
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useTranslation } from "react-i18next";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";

function Cards({ data }) {
  const { t } = useTranslation();

  const cards = [
    {
      title: "Sales",
      amount: data.sales / 100 || 0,
      icon: <AttachMoneyIcon />,
    },
    { title: "Clients", amount: data.clients || 0, icon: <PersonIcon /> },
    { title: "Companies", amount: data.companies || 0, icon: <BusinessIcon /> },
    {
      title: "Distributors",
      amount: data.distributors || 0,
      icon: <BusinessIcon />,
    },
  ];
  return (
    <Grid container spacing={2}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card>
            <CardContent sx={{ textAlign: "left" }}>
              <Avatar sx={{ marginY: "10px" }}>
                {card.icon || <PersonIcon />}
              </Avatar>
              <Typography variant="h6" color="gray">
                {t(`dashboard_${card.title.toLowerCase()}`)}
              </Typography>
              <Typography variant="h5" color="black">
                {card.amount}

                {card.title === "Sales" ? "$" : ""}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default Cards;
