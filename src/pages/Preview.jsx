import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetForm } from "../store/formSlice";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import ExcelGenerator from "./ExcelGenerator";
import Text from "../components/Text";
import LoadTable from "./LoadTable";
import ButtonComponent from "../components/Button";

const Preview = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.form);

  const handleStart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Starting a new audit will erase all current data.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Start New Audit",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(resetForm()); // Reset Redux state
        navigate("/"); // Navigate to home page
      }
    });
  };

  return (
    <Box
      sx={{
        padding: "45px 30px 40px 40px",
        display: "flex",
        flexDirection: "column",
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
            <Text variant="title" fontSize="18px">
              Preview
            </Text>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            paddingTop: "25px",
          }}
        >
          <Text variant="subtitle" fontSize="18px">
            Listed Buildings
          </Text>
          <Box sx={{ height: "60vh", overflowY: "scroll" }}>
            <LoadTable jsonData={forms} />
          </Box>
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap:"15px",paddingTop: "30px", paddingBottom:"20px"}}>
        <ExcelGenerator jsonData={forms} />
        <ButtonComponent variant="secondary" onClick={handleStart}>
          Start New Auditing
        </ButtonComponent>
      </Box>
    </Box>
  );
};

export default Preview;
