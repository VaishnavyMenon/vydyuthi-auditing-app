import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateBasicBuilding } from "../store/formSlice";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableInputField from "../components/InputField";
import Text from "../components/Text";
import ButtonComponent from "../components/Button";

const BasicBuilding = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const basicBuilding = useSelector((state) => state.form.basicBuilding);

  const [formData, setFormData] = useState({
    numberOfBuildings: "",
    buildings: ["", "", ""],
  });

  useEffect(() => {
    if (basicBuilding) {
      setFormData(basicBuilding);
    }
  }, [basicBuilding]);

  const handleInputChange = (field) => (value) => {
    if (field === "numberOfBuildings") {
      const numberOfBuildings = parseInt(value, 10) || 0;
      const newBuildings = Array(numberOfBuildings)
        .fill("")
        .map((_, i) => formData.buildings[i] || "");
      const newFormData = {
        ...formData,
        numberOfBuildings: value,
        buildings: newBuildings,
      };
      setFormData(newFormData);
      dispatch(updateBasicBuilding(newFormData));
    } else {
      const buildingIndex = parseInt(field);
      const newBuildings = [...formData.buildings];
      newBuildings[buildingIndex] = value;
      const newFormData = {
        ...formData,
        buildings: newBuildings,
      };
      setFormData(newFormData);
      dispatch(updateBasicBuilding(newFormData));
    }
  };

  const handleNext = () => {
    dispatch(updateBasicBuilding(formData));
    navigate("/add-details");
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
          <Box onClick={() => navigate("/basic-energy")}>
            <ArrowBackIosIcon sx={{ color: "#539F58" }} />
          </Box>
          <Box>
            <Text variant={"subtitle"}>WALKTHROUGH EA</Text>
            <br />
            <Text variant="title" fontSize="18px">
              Basic building details
            </Text>
            <br />
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
            label="Number of Buildings"
            variant="text"
            value={formData.numberOfBuildings}
            onChange={(value) => handleInputChange("numberOfBuildings")(value)}
            fullWidth
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              maxHeight: "46vh",
              overflowY: "scroll",
              paddingTop: "10px",
            }}
          >
            {formData.buildings.map((building, index) => (
              <Box key={index} sx={{ display: "flex", gap: "15px" }}>
                <Box
                  sx={{
                    bgcolor: "#AABFAB",
                    width: "54px",
                    height: "50px",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "10px",
                  }}
                >
                  {index + 1}
                </Box>
                <ReusableInputField
                  label="Building name"
                  variant="text"
                  value={building}
                  onChange={(value) =>
                    handleInputChange(index.toString())(value)
                  }
                  fullWidth
                />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <ButtonComponent
          variant="primary"
          disabled={
            !formData.buildings.some((building) => building.trim() !== "")
          }
          onClick={handleNext}
        >
          Start Auditing
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default BasicBuilding;
