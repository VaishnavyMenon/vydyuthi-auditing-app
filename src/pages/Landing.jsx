import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import LandingImage from "../assets/png/landingImage.png";
import Logo from "../assets/svg/logo.svg";
import ButtonComponent from "../components/Button";

const Landing = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
        }}
      >
        <Box
          component={"img"}
          src={Logo}
          sx={{
            // height: "710px",
            width: "120px",
            display: "flex",
            top: 20,
            position: "fixed",
            zIndex: 10,
          }}
        />
      </Box>
      <Box
        component={"img"}
        src={LandingImage}
        sx={{
          minHeight: "710px",
          width: "100vw",
          display: "flex",
          top: 0,
          position: "fixed",
          maxWidth: "100vw", // Prevents the image from exceeding the container's width
          height: "auto",
        }}
      />
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderRadius: "40px 40px 0px 0px",
          position: "fixed",
          bottom: 0,
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Box sx={{ padding: "40px 40px" }}>
          <Box>
            <Typography
              sx={{
                fontFamily: "Lato, sans-serif",
                fontSize: "28px",
                color: "#539F58",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              Audit Smarter,<span style={{ color: "#131313" }}> Save More</span>
            </Typography>
            <Typography
              sx={{
                fontFamily: "Lato, sans-serif",
                fontSize: "18px",
                color: "#999999",
                textAlign: "center",
                paddingTop: "15px",
                pb: "52px",
              }}
            >
              Revolutionize energy audits. Save more, waste less, every step of
              the way.
            </Typography>
          </Box>
          <ButtonComponent
            variant="primary"
            onClick={() => navigate("/facility-details")}
          >
            Start Auditing
          </ButtonComponent>
        </Box>
      </Box>
    </Box>
  );
};

export default Landing;
