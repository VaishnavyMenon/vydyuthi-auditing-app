import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addLoad } from "../store/formSlice";
import { Box } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableInputField from "../components/InputField";
import Text from "../components/Text";
import ButtonComponent from "../components/Button";

const AddLoad = () => {
  const { loadType } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [options, setOptions] = useState([]);

  const { building, floorNumber, roomName } = useSelector(
    (state) => state.form.addDetails
  );

  const forms = useSelector((state) => state.form);

  let uniqueLoadNamesMap = new Map();

  useEffect(() => {
    const category = loadType.toLowerCase();
    forms.buildings.forEach(building => {
      building.floors.forEach(floor => {
        floor.rooms.forEach(room => {
          if (room.loads[category] && room.loads[category].length > 0) {
            room.loads[category].forEach(loadGroup => {
              loadGroup.forEach(load => {
                let lowerCaseName = load.loadName.toLowerCase();
                if (!uniqueLoadNamesMap.has(lowerCaseName)) {
                  uniqueLoadNamesMap.set(lowerCaseName, load.loadName); // Store first occurrence of the name with original case
                }
              });
            });
          }
        });
      });
    });
    setOptions(Array.from(uniqueLoadNamesMap.values()));
  }, []);
  const existingLoads = useSelector((state) => {
    const buildingData = state.form.buildings.find((b) => b.name === building);
    const floorData = buildingData?.floors.find(
      (f) => f.floorNumber === floorNumber
    );
    const roomData = floorData?.rooms.find((r) => r.roomName === roomName);
    return roomData?.loads[loadType] || [];
  });
  const [errors, setErrors] = useState({});
  const [loads, setLoads] = useState(
    existingLoads.length > 0
      ? existingLoads
      : [
          {
            loadName: "",
            watts: "",
            quantity: "",
            hoursPerDay: "",
          },
        ]
  );
  useEffect(() => {
    if (existingLoads.length > 0) {
      setLoads(existingLoads[0]);
    }
  }, [existingLoads]);

  const handleInputChange = (index, field) => (value) => {
    const newLoads = [...loads];
    newLoads[index] = { ...newLoads[index], [field]: value };
    setLoads(newLoads);
  };

  const handleSave = () => {
    let hasErrors = false;
    let newErrors = {}; // Store validation errors

    const filteredLoads = loads.filter((load) =>
      Object.values(load).some((value) => value !== "" && value !== undefined)
    );

    // Validate each load
    filteredLoads.forEach((load, index) => {
      let loadErrors = {};
      if (!load.loadName?.trim()) loadErrors.loadName = "Required";
      if (!load.watts) loadErrors.watts = "Required";
      if (!load.quantity) loadErrors.quantity = "Required";
      if (!load.hoursPerDay) loadErrors.hoursPerDay = "Required";

      if (Object.keys(loadErrors).length > 0) {
        newErrors[index] = loadErrors; // Assign errors to specific load index
        hasErrors = true;
      }
    });

    if (hasErrors) {
      setErrors(newErrors); // Update state with errors
      return; // Stop execution if errors exist
    }

    setErrors({}); // Clear errors if validation passes

    dispatch(
      addLoad({
        buildingName: building,
        floorNumber,
        roomName,
        loadType,
        loadData: filteredLoads,
      })
    );

    navigate("/select-load");
  };

  const handleAddLoadComponent = () => {
    setLoads([
      ...loads,
      { loadName: "", watts: "", quantity: "", hoursPerDay: "" },
    ]);
  };

  const formatLoadType = (type) => {
    switch (type) {
      case "light":
        return "Light Load";
      case "ventilation":
        return "Ventilation Load";
      case "system":
        return "System Load";
      case "pump":
        return "Pump Load";
      case "airConditioner":
        return "Air Conditioner Load";
      case "others":
        return "Other Load";
      default:
        return "Load";
    }
  };


  return (
    <Box
      sx={{
        padding: "45px 30px 10px 40px",
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
          <Box onClick={() => navigate("/select-load")}>
            <ArrowBackIosIcon sx={{ color: "#539F58" }} />
          </Box>
          <Box>
            <Text variant={"subtitle"}>LOAD TYPE</Text>
            <br />
            <Text variant="title" fontSize="18px">
              {formatLoadType(loadType)}
            </Text>
            <br />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "18px",
            paddingTop: "30px",
            maxHeight: "65vh",
            overflowY: "scroll",
          }}
        >
          {loads.map((load, index) => (
            <Box
              key={index}
              sx={{
                padding: "20px 18px",
                borderRadius: "15px",
                bgcolor: "#E3F2E4",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <ReusableInputField
                variant="dropdown"
                label="Add load name"
                options={options}
                value={load.loadName} 
                onChange={(value) => handleInputChange(index, "loadName")(value)}
                error={!!errors[index]?.loadName}
                helperText={errors[index]?.loadName || ""}
              />

              <Box sx={{ display: "flex", gap: "18px" }}>
                <ReusableInputField
                  variant="text"
                  label="Watts"
                  value={load.watts}
                  onChange={(value) => handleInputChange(index, "watts")(value)}
                  error={!!errors[index]?.watts}
                  helperText={errors[index]?.watts || ""}
                />
                <ReusableInputField
                  variant="text"
                  label="Nos."
                  value={load.quantity}
                  onChange={(value) =>
                    handleInputChange(index, "quantity")(value)
                  }
                  error={!!errors[index]?.quantity}
                  helperText={errors[index]?.quantity || ""}
                />
                <ReusableInputField
                  variant="text"
                  label="Daily usage (hrs)"
                  value={load.hoursPerDay}
                  onChange={(value) =>
                    handleInputChange(index, "hoursPerDay")(value)
                  }
                  error={!!errors[index]?.hoursPerDay}
                  helperText={errors[index]?.hoursPerDay || ""}
                />
              </Box>
            </Box>
          ))}
          <Box
            sx={{
              padding: "10px ",
              borderRadius: "15px",
              bgcolor: "#E3F2E4",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "28px",
              color: "#539F58",
              cursor: "pointer",
            }}
            onClick={handleAddLoadComponent}
          >
            +
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", marginTop: "25px", paddingBottom:"20px" }}>
        <ButtonComponent variant="primary" onClick={handleSave}>
          Save
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default AddLoad;
