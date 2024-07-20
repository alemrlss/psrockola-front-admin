import {
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useTranslation } from "react-i18next";

function FormCreateMembership({
  countries,
  formData,
  handleChange,
  handleSubmit,
}) {
  const { t } = useTranslation();

  return (
    <Grid item xs={12} md={6}>
      <Card
        className="h-full"
        sx={{ backgroundColor: "#E5E5E5", color: "black" }}
      >
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormControl fullWidth>
              <InputLabel id="countryId-label">Country</InputLabel>
              <Select
                labelId="countryId-label"
                id="countryId"
                name="countryId"
                label={t("view_membership_create_country")}
                value={formData.countryId}
                onChange={handleChange}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    {country.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="interval-label">
                {" "}
                {t("view_membership_create_period")}
              </InputLabel>
              <Select
                labelId="interval-label"
                id="interval"
                name="interval"
                label={t("view_membership_create_period")}
                value={formData.interval}
                onChange={handleChange}
              >
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="type-label">
                {t("view_membership_create_type")}
              </InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                label={t("view_membership_create_type")}
                value={formData.type}
                onChange={handleChange}
              >
                <MenuItem value={10}>BASICO</MenuItem>
                <MenuItem value={20}>PLUS</MenuItem>
                <MenuItem value={30}>PREMIUM</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label={t("view_membership_create_name")}
              id="name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label={t("view_membership_create_amount")}
              id="amount"
              name="amount"
              fullWidth
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="currency-label">
                {t("view_membership_create_currency")}
              </InputLabel>
              <Select
                labelId="currency-label"
                id="currency"
                name="currency"
                label={t("view_membership_create_currency")}
                value={formData.currency}
                onChange={handleChange}
              >
                <MenuItem value="usd">USD</MenuItem>
                {/* Agrega otras opciones de moneda según sea necesario */}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" fullWidth>
              {t("view_membership_create_btn")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default FormCreateMembership;
