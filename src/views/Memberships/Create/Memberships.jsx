import { useState, useEffect } from "react";
import { Box, Grid } from "@mui/material";
import api from "../../../api/api";
import MembershipCard from "../../../components/Membership/Create/MembershipCard";
import FormCreateMembership from "../../../components/Membership/Create/FormCreateMembership";
import { useTranslation } from "react-i18next";

function CreateMemberships() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    countryId: "",
    name: "",
    amount: "",
    currency: "",
    type: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    try {
      const fetchCountries = async () => {
        const response = await api.get("/country");
        const countries = await response.data;
        setCountries(countries.data);
      };
      fetchCountries();
    } catch (error) {
      console.error("Error al obtener países:", error);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setSuccess("");

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");

    if (
      !formData.countryId ||
      !formData.name ||
      !formData.amount ||
      !formData.currency ||
      !formData.type
    ) {
      setError("* - Todos los campos son obligatorios");
      return;
    }

    const amountInCents = formData.amount * 100;
    const subscriptionData = {
      ...formData,
      amount: amountInCents,
    };

    try {
      await api.post("/membership/create", subscriptionData);
      setFormData({
        countryId: null,
        name: "",
        amount: "",
        currency: null,
        type: null,
      });
      setSuccess("Membresía creada correctamente");
    } catch (error) {
      console.error("Error al crear membresía:", error);
      setError(`* -${error.response.data.message}`);
    }
  };

  const getBenefits = () => {
    switch (formData.type) {
      case 10:
        return {
          sales: "1",
          skins: "1",
          screens: "2",
        };
      case 20:
        return {
          sales: "3",
          skins: "3",
          screens: "4",
        };
      case 30:
        return {
          sales: "5",
          skins: "5",
          screens: "6",
        };
      default:
        return "";
    }
  };

  return (
    <Box>
      <div className="flex items-center space-x-2 py-4">
        <h2 className="text-2xl font-semibold">{t("membership_create")}</h2>
        <p className="text-red-500">{error}</p>
        <p className="text-green-600 font-bold">{success}</p>
      </div>
      <Grid container spacing={2}>
        <FormCreateMembership
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          countries={countries}
          formData={formData}
        />
        <MembershipCard formData={formData} getBenefits={getBenefits} />
      </Grid>
    </Box>
  );
}

export default CreateMemberships;
