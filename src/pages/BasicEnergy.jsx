import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBasicEnergy } from "../store/formSlice";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableInputField from "../components/InputField";
import Text from "../components/Text";
import ButtonComponent from "../components/Button";

const BasicEnergy = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basicEnergy = useSelector((state) => state.form.basicEnergy);

  const [formData, setFormData] = useState({
    connectionType: "",
    connectedLoadKW: "",
    contractDemandKVA: "",
    billingType: "",
    solarCapacity: "",
  });

  useEffect(() => {
    setFormData(basicEnergy);
  }, [basicEnergy]);

  const handleInputChange = (field) => (value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    dispatch(updateBasicEnergy(newFormData));
  };

  const isFormValid = () => {
    return (
      formData.connectionType !== "" &&
      formData.connectedLoadKW !== "" &&
      formData.contractDemandKVA !== "" &&
      formData.billingType !== ""
    );
  };

  const handleNext = () => {
    dispatch(updateBasicEnergy(formData));
    navigate("/basic-building");
  };

  return (
    <Box
      sx={{
        padding: "45px 30px 40px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "90vh",
      }}
    >
      <Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            gap: "15px",
          }}
        >
          <Box onClick={() => navigate("/facility-details")}>
            <ArrowBackIosIcon sx={{ color: "#539F58" }} />
          </Box>
          <Box>
            <Text variant={"subtitle"}>WALKTHROUGH EA</Text>
            <br />
            <Text variant="title" fontSize="18px">
              Basic energy details
            </Text>
            <br />
            <Text variant="description" paddingTop="3px">
              Enter the utility name, consumer number, connection type, and
              other details for a thorough assessment.
            </Text>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            paddingTop: "45px",
          }}
        >
          <ReusableInputField
            label="Connection type"
            variant="dropdown"
            options={["High Tension", "Low Tension"]}
            value={formData.connectionType}
            onChange={(value) => handleInputChange("connectionType")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Connected Load in kW"
            variant="text"
            value={formData.connectedLoadKW}
            onChange={(value) => handleInputChange("connectedLoadKW")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Contract demand in KVA"
            variant="text"
            value={formData.contractDemandKVA}
            onChange={(value) => handleInputChange("contractDemandKVA")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Billing type"
            variant="dropdown"
            options={["Monthly", "Bi-Monthly"]}
            value={formData.billingType}
            onChange={(value) => handleInputChange("billingType")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Capacity of on-grid solar system installed"
            variant="text"
            value={formData.solarCapacity}
            onChange={(value) => handleInputChange("solarCapacity")(value)}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <ButtonComponent
          variant="primary"
          onClick={handleNext}
          disabled={!isFormValid()}
        >
          Next
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default BasicEnergy;
