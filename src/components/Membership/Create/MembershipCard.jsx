import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import getBenefitsMembership from "../../../utils/getBenefitsMembership";
import getIconMembership from "../../../utils/getIconMembership";
import { useTranslation } from "react-i18next";

function MembershipCard({ formData }) {
  const { t } = useTranslation();
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{ backgroundColor: "#F66E0C", color: "white" }}
        className="h-full"
      >
        <CardContent className="mx-12">
          <div className="text-2xl flex items-center font-bold space-x-3">
            <p>
              {formData.name
                ? formData.name
                : t("view_membership_create_card_name")}
            </p>
            <div className="rounded-full p-2">
              {getIconMembership(formData.type).icon}
            </div>
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
            {formData.amount ? formData.amount : 0} usd/{formData.interval}
          </Typography>

          <div className="mt-6 space-y-2 flex flex-col">
            <Typography variant="h6" className="mb-4">
              <CheckIcon sx={{ color: "green", marginRight: 2 }} />
              {getBenefitsMembership(formData.type).sales}{" "}
              {getBenefitsMembership(formData.type).sales === "1"
                ? t("view_membership_create_card_employee")
                : t("view_membership_create_card_employees")}{" "}
            </Typography>
            <Typography variant="h6" className="mb-4">
              <CheckIcon sx={{ color: "green", marginRight: 2 }} />
              {getBenefitsMembership(formData.type).skins}{" "}
              {t("view_membership_create_card_skins")}
            </Typography>
            <Typography variant="h6" className="mb-2">
              <CheckIcon sx={{ color: "green", marginRight: 2 }} />1 Screen (
              {t("view_membership_create_card_screen_max")}{" "}
              {getBenefitsMembership(formData.type).screens}{" "}
              {t("view_membership_create_card_screen")})
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
            {t("view_membershio_create_card_btn")}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MembershipCard;
