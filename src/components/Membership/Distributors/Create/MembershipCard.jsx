import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import getBenefitsMembershipDistributor from "../../../../utils/getBenefitsMembershipDistributor";
import { useTranslation } from "react-i18next";

function MembershipCardDistributor({ formData }) {
  const { t } = useTranslation();
  return (
    <Grid item xs={12} md={6}>
      <Card
        sx={{ backgroundColor: "#555CB3", color: "white" }}
        className="h-full"
      >
        <CardContent className="mx-12">
          <div className="text-2xl flex items-center font-bold space-x-3">
            <p>
              {formData.name
                ? formData.name
                : t("view_membership_distributor_create_card")}
            </p>
            <div className="rounded-full p-2"></div>
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
            <Typography variant="h6" className="mb-2">
              <CheckIcon sx={{ color: "#70E44C", marginRight: 2 }} />
              {t("view_membership_distributor_create_max")}{" "}
              {getBenefitsMembershipDistributor(formData.type).accounts}{" "}
              {t("view_membership_distributor_create_acc")}
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
            {t("view_membership_distributor_create_get")}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default MembershipCardDistributor;
