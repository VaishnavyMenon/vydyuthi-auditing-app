import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateFacilityDetails } from "../store/formSlice";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableInputField from "../components/InputField";
import Text from "../components/Text";
import ButtonComponent from "../components/Button";

const FacilityDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const facilityDetails = useSelector((state) => state.form.facilityDetails);

  const [formData, setFormData] = useState({
    facilityType: "",
    facilityName: "",
    address: "",
    buildUpArea: "",
    utility: "",
    consumerNumber: "",
    connectedLoad: "",
  });

  useEffect(() => {
    setFormData(facilityDetails);
  }, [facilityDetails]);

  const handleInputChange = (field) => (value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    dispatch(updateFacilityDetails(newFormData));
  };

  const isFormValid = () => {
    return Object.values(formData).every((value) => value !== "");
  };

  const handleNext = () => {
    dispatch(updateFacilityDetails(formData));
    navigate("/basic-energy");
  };

  return (
    <Box
      sx={{
        padding: "45px 40px 10px 40px",
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
          <Box onClick={() => navigate("/")}>
            <ArrowBackIosIcon sx={{ color: "#539F58" }} />
          </Box>
          <Box>
            <Text variant={"subtitle"}>NEW PROJECT</Text>
            <br />
            <Text variant="title">Facility Details</Text>
            <br />
            <Text variant="description" paddingTop="3px">
              Provide the building type, address, and key details to help us
              customize our services for you.
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
            label="Facility Type"
            variant="dropdown"
            options={["Commercial", "Industry", "Residential"]}
            value={formData.facilityType}
            onChange={(value) => handleInputChange("facilityType")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Facility Name"
            variant="text"
            value={formData.facilityName}
            onChange={(value) => handleInputChange("facilityName")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Address"
            variant="text"
            value={formData.address}
            onChange={(value) => handleInputChange("address")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Build up area (sq.mt)"
            variant="text"
            value={formData.buildUpArea}
            onChange={(value) => handleInputChange("buildUpArea")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Utility"
            variant="dropdown"
            options={["KSEB", "TNEB", "BESCOM"]}
            value={formData.utility}
            onChange={(value) => handleInputChange("utility")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Consumer number"
            variant="text"
            value={formData.consumerNumber}
            onChange={(value) => handleInputChange("consumerNumber")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Connected Load (kW)"
            variant="text"
            value={formData.connectedLoad}
            onChange={(value) => handleInputChange("connectedLoad")(value)}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "25px", paddingBottom:"20px" }}>
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

export default FacilityDetails;
