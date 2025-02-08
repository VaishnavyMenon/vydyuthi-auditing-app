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
      <Box sx={{display:'flex', alignItems:'center', justifyContent:'center', width:'100vw'}}>

      <Box
        component={"img"}
        src={Logo}
        sx={{
          // height: "710px",
          width: "120px",
          display: "flex",
          top: 20,
          position: "fixed",
          zIndex:10
        }}
        />
        </Box>
      <Box
        component={"img"}
        src={LandingImage}
        sx={{
          height: "710px",
          width: "100vw",
          display: "flex",
          top: 0,
          position: "fixed",
        }}
      />
      <Box
        sx={{
          bgcolor: "#ffffff",
          borderRadius: "40px 40px 0px 0px",
          position: "fixed",
          bottom: 0,
          padding: "42px 40px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box>
        <Typography
          sx={{
            fontFamily: "Lato, sans-serif",
            fontSize: "28px",
            color: "#539F58",
            fontWeight: 700,
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
          Revolutionize energy audits. Save more, waste less, every step of the
          way.
        </Typography>
        </Box>
        <ButtonComponent 
          variant="primary" 
          onClick={() => navigate('/facility-details')}
        >
          Start Auditing
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default Landing;
