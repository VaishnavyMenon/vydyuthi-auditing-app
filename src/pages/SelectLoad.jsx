import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ReusableInputField from "../components/InputField";
import Text from "../components/Text";
import ButtonComponent from "../components/Button";
import LightLoad from "../assets/png/light-load.png";
import VentilationLoad from "../assets/png/ventilation-load.png";
import SystemLoad from "../assets/png/system-load.png";
import PumpLoad from "../assets/png/pump-load.png";
import AirConditionerLoad from "../assets/png/air-conditioner-load.png";

const SelectLoad = () => {
  const navigate = useNavigate();
  const addDetails = useSelector((state) => state.form.addDetails);

  const handleLoadClick = (loadType) => {
    navigate(`/add-load/${loadType}`);
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
          <Box onClick={() => navigate("/add-details")}>
            <ArrowBackIosIcon sx={{ color: "#539F58" }} />
          </Box>
          <Box>
            <Text variant={"subtitle"}>WALKTHROUGH EA</Text>
            <br />
            <Text variant="title" fontSize="18px">
              Select Load type
            </Text>
            <br />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            paddingTop: "24px",
          }}
        >
          <ReusableInputField
            label="Building"
            variant="text"
            value={addDetails.building}
            fullWidth
            disabled
          />
          <ReusableInputField
            label="Floor number"
            variant="text"
            value={addDetails.floorNumber}
            fullWidth
            disabled
          />
          <ReusableInputField
            label="Room name"
            variant="text"
            value={addDetails.roomName}
            fullWidth
            disabled
          />
        </Box>
        <Box
          sx={{
            border: "2px solid #AABFAB",
            borderRadius: "20px",
            maxWidth: "355px",
            zIndex: 0,
            marginTop: "25px",
            padding: "20px 30px",
          }}
        >
          <Box
            sx={{
              fontFamily: "Lato, sans-serif",
              fontWeight: 600,
              fontSize: "24px",
              color: "#539F58",
              borderRadius: "15px",
              width: "fit-content",
              margin: "auto",
              marginBottom: "20px",
              zIndex: 100,
              display: "flex",
            }}
          >
            Select Load
          </Box>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "24px 70px",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <Box
                onClick={() => handleLoadClick("light")}
                sx={{
                  height: "67px",
                  width: "96px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#539F58",
                  borderRadius: "15px",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#467a46",
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={LightLoad}
                  sx={{ height: "45px", width: "45px" }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  color: "#539F58",
                }}
              >
                Light Load
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <Box
                onClick={() => handleLoadClick("ventilation")}
                sx={{
                  height: "67px",
                  width: "96px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#539F58",
                  borderRadius: "15px",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#467a46",
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={VentilationLoad}
                  sx={{ height: "45px", width: "45px" }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  color: "#539F58",
                }}
              >
                Ventilation Load
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <Box
                onClick={() => handleLoadClick("system")}
                sx={{
                  height: "67px",
                  width: "96px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#539F58",
                  borderRadius: "15px",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#467a46",
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={SystemLoad}
                  sx={{ height: "45px", width: "45px" }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  color: "#539F58",
                }}
              >
                System Load
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <Box
                onClick={() => handleLoadClick("pump")}
                sx={{
                  height: "67px",
                  width: "96px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#539F58",
                  borderRadius: "15px",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#467a46",
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={PumpLoad}
                  sx={{ height: "45px", width: "45px" }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  color: "#539F58",
                }}
              >
                Pump Load
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
              }}
            >
              <Box
                onClick={() => handleLoadClick("airConditioner")}
                sx={{
                  height: "67px",
                  width: "96px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  bgcolor: "#539F58",
                  borderRadius: "15px",
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "#467a46",
                  },
                }}
              >
                <Box
                  component={"img"}
                  src={AirConditionerLoad}
                  sx={{ height: "45px", width: "45px" }}
                />
              </Box>
              <Typography
                sx={{
                  fontFamily: "Lato, sans-serif",
                  fontWeight: 800,
                  fontSize: "15px",
                  color: "#539F58",
                }}
              >
                Air Conditioner Load
              </Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column", paddingTop: "30px" }}
        >
          <ButtonComponent
            variant="secondary"
            onClick={() => navigate("/add-details")}
          >
            Add Next
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default SelectLoad;
