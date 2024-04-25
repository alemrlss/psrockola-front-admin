import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

function MembershipCard({ formData, getBenefits }) {
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{ backgroundColor: "#F66E0C", color: "white" }}
        className="h-full"
      >
        <CardContent className=" mx-12">
          <div className="text-2xl flex items-center font-bold space-x-3">
            <p>{formData.name ? formData.name : " Nombre de la Membresia"}</p>
            <EmojiEventsIcon fontSize="large" sx={{ color: "yellow" }} />{" "}
          </div>
          <p className="text-center text-sm my-2 font-mono"></p>
          <Typography
            variant="h2"
            sx={{
              fontWeight: "bold",
              fontSize: "3rem",
              lineHeight: "1.2",
              letterSpacing: "-0.01562em",
              textAlign: "center",
              color: "white",
              py: 2,
            }}
          >
            {formData.currency === "usd" ? "$" : "$"}
            {formData.amount ? formData.amount : 0}
          </Typography>
          <Typography variant="h5">por usuario/mes facturado</Typography>

          <div className="mt-6 space-y-2 flex flex-col">
            <Typography variant="h6" className="mb-4">
              <CheckIcon sx={{ color: "green", marginRight: 2 }} />
              {getBenefits().sales}{" "}
              {getBenefits().sales === "1" ? "Cuenta" : "Cuentas"} para ventas
            </Typography>
            <Typography variant="h6" className="mb-4">
              <CheckIcon sx={{ color: "green", marginRight: 2 }} />
              {getBenefits().skins} Skins disponibles
            </Typography>
            <Typography variant="h6" className="mb-2">
              <CheckIcon sx={{ color: "green", marginRight: 2 }} />1 Pantalla
              (Maximo {getBenefits().screens} pantallas)
            </Typography>
          </div>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "white",
              color: "black",
              marginTop: 4,
              borderRadius: 50,
              "&:hover": {
                backgroundColor: "white",
                color: "black",
              },
            }}
            fullWidth
          >
            Obtener
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MembershipCard;
