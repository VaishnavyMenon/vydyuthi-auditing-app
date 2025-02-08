import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateAddDetails } from "../store/formSlice";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableInputField from "../components/InputField";
import Text from "../components/Text";
import ButtonComponent from "../components/Button";

const AddDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const buildings = useSelector((state) => state.form.basicBuilding.buildings);
  const addDetails = useSelector((state) => state.form.addDetails);
  const forms = useSelector((state) => state.form);
  const [formData, setFormData] = useState({
    building: "",
    floorNumber: "",
    roomName: "",
  });

  useEffect(() => {
    setFormData(addDetails);
  }, [addDetails]);

  const handleInputChange = (field) => (value) => {
    const newFormData = { ...formData, [field]: value };
    setFormData(newFormData);
    dispatch(updateAddDetails(newFormData));
  };

  const handleAddLoad = () => {
    dispatch(updateAddDetails(formData));
    navigate("/select-load");
  };

  const handleClick = () => {
    navigate("/preview");
  };

  const isSurveyComplete = forms.buildings.some((building) =>
    building.floors.some((floor) =>
      floor.rooms.some((room) =>
        Object.values(room.loads).some((loadType) => loadType.length > 0)
      )
    )
  );

  return (
    <Box
      sx={{
        padding: "45px 30px 40px 40px",
        display: "flex",
        flexDirection: "column",
        gap: "70px",
        height: "90vh",
        minWidth: "350px",
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
          <Box onClick={() => navigate("/basic-building")}>
            <ArrowBackIosIcon sx={{ color: "#539F58" }} />
          </Box>
          <Box sx={{ width: "100%" }}>
            <Text variant={"subtitle"}>WALKTHROUGH EA</Text>
            <br />
            <Text variant="title" fontSize="18px">
              Add details
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
            label="Select the building"
            variant="dropdown"
            options={buildings}
            value={formData.building}
            onChange={(value) => handleInputChange("building")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Enter floor number"
            variant="text"
            value={formData.floorNumber}
            onChange={(value) => handleInputChange("floorNumber")(value)}
            fullWidth
          />
          <ReusableInputField
            label="Enter room name"
            variant="text"
            value={formData.roomName}
            onChange={(value) => handleInputChange("roomName")(value)}
            fullWidth
          />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <ButtonComponent
          variant="primary"
          onClick={handleAddLoad}
          disabled={
            !formData.building.trim() ||
            !formData.floorNumber.trim() ||
            !formData.roomName.trim()
          }
        >
          Add Load
        </ButtonComponent>
        <ButtonComponent
          variant="secondary"
          onClick={handleClick}
          disabled={!isSurveyComplete}
        >
          Finish Survey
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default AddDetails;
