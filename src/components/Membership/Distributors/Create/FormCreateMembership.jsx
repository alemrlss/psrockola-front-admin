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

function FormCreateMembershipDistributor({
  countries,
  formData,
  handleChange,
  handleSubmit,
}) {
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
                label="Country"
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
              <InputLabel id="interval-label">Periodo de Membresía</InputLabel>
              <Select
                labelId="interval-label"
                id="interval"
                name="interval"
                label="Periodo de Membresía"
                value={formData.interval}
                onChange={handleChange}
              >
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel id="type-label">Cuentas</InputLabel>
              <Select
                labelId="type-label"
                id="type"
                name="type"
                label="Cuentas"
                value={formData.type}
                onChange={handleChange}
              >
                <MenuItem value={10}>50 Cuentas</MenuItem>
                <MenuItem value={20}>100 Cuentas</MenuItem>
                <MenuItem value={30}>150 Cuentas</MenuItem>
                <MenuItem value={40}>200 Cuentas</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Nombre"
              id="name"
              name="name"
              fullWidth
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label="Amount"
              id="amount"
              name="amount"
              fullWidth
              type="number"
              value={formData.amount}
              onChange={handleChange}
            />

            <FormControl fullWidth>
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                id="currency"
                name="currency"
                label="Currency"
                value={formData.currency}
                onChange={handleChange}
              >
                <MenuItem value="usd">USD</MenuItem>
                {/* Agrega otras opciones de moneda según sea necesario */}
              </Select>
            </FormControl>

            <Button type="submit" variant="contained" fullWidth>
              Crear Membresía
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default FormCreateMembershipDistributor;
