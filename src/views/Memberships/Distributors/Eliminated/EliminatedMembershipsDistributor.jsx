import { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Switch,
  FormControlLabel,
} from "@mui/material";
import api from "../../../../api/api";
import { useTranslation } from "react-i18next";
import MembershipCardDistributor from "../../../../components/Membership/Distributors/Delete/MembershipCardDistributor";

function EliminatedMembershipsDistributor() {
  const { t } = useTranslation();
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [memberships, setMemberships] = useState([]);

  const [filterInterval, setFilterInterval] = useState("month");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await api.get("/country");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    setSelectedCountry(event.target.value);
    try {
      const response = await api.get(
        `/distributor-membership/${event.target.value}`
      );
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
    }
  };

  const filteredMemberships = memberships.filter(
    (membership) => membership.interval === filterInterval
  );
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="country-label">Select Country</InputLabel>
        <Select
          labelId="country-label"
          id="country-select"
          label="Select Country"
          value={selectedCountry}
          onChange={handleCountryChange}
          style={{ minWidth: "200px" }}
        >
          <MenuItem value="" disabled>
            Select a country
          </MenuItem>
          {countries.map((country) => (
            <MenuItem key={country.id} value={country.id}>
              {country.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div className="flex items-center">
        <span className="mr-4">{t("monthly_memberships")}</span>{" "}
        {/* Etiqueta "month" */}
        <FormControlLabel
          control={
            <Switch
              checked={filterInterval === "year"}
              onChange={() =>
                setFilterInterval(filterInterval === "year" ? "month" : "year")
              }
              sx={{
                "& .MuiSwitch-thumb": {
                  backgroundColor: "#FFA500",
                },

                "& .MuiSwitch-thumb.Mui-checked": {
                  transform: "translateX(24px)",
                },
              }}
            />
          }
          label="" // No hace falta poner un texto aquí, ya que se manejan por separado.
        />
        <span className="ml-4">{t("yearly_memberships")}</span>{" "}
      </div>

      {/* Muestra las membresías */}
      <Grid container spacing={2}>
        {filteredMemberships.map((membership) => (
          <MembershipCardDistributor
            key={membership.id}
            membership={membership}
          />
        ))}
      </Grid>
      {memberships.length === 0 && (
        <p className="text-4xl my-10 text-[#555CB3] font">
          No memberships available
        </p>
      )}
    </div>
  );
}

export default EliminatedMembershipsDistributor;
