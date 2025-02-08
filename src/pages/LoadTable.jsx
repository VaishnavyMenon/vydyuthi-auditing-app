import React from "react";
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Paper } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const LoadTable = ({ jsonData }) => {
  return (
    <Box sx={{  display: "flex", flexDirection: "column", gap: "10px" }}>
      {jsonData.buildings.map((building, bIndex) => (
        <Accordion key={bIndex} sx={{ bgcolor: "#eee", borderRadius: "10px" }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography sx={{ fontWeight: "bold" }}>{building.name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {building.floors.map((floor, fIndex) => (
              <Accordion key={fIndex} sx={{ bgcolor: "#fff", borderRadius: "10px", marginBottom: "10px" }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography sx={{ fontWeight: "bold" }}>Floor: {floor.floorNumber}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {floor.rooms.map((room, rIndex) => (
                    <Paper key={rIndex} sx={{ padding: "10px", bgcolor: "#e3f2e4", marginBottom: "10px", borderRadius: "8px" }}>
                      <Typography sx={{ fontWeight: "bold", marginBottom: "5px" }}>Room: {room.roomName}</Typography>
                      {Object.keys(room.loads).map((category) =>
                        room.loads[category].map((loadGroup, gIndex) =>
                          loadGroup.map((load, lIndex) => (
                            <Box key={lIndex} sx={{ padding: "5px 0" }}>
                              <Typography sx={{ fontSize: "14px", fontWeight: "bold" }}>{load.loadName}</Typography>
                              <Typography sx={{ fontSize: "12px" }}>Watts: {load.watts}W</Typography>
                              <Typography sx={{ fontSize: "12px" }}>Nos: {load.quantity}</Typography>
                              <Typography sx={{ fontSize: "12px" }}>Daily Usage: {load.hoursPerDay} hrs</Typography>
                              <Typography sx={{ fontSize: "12px", fontWeight: "bold", color: "#2E7D32" }}>
                                Total Hrs: {load.quantity * load.hoursPerDay}
                              </Typography>
                              <hr style={{ border: "0.5px solid #ddd" }} />
                            </Box>
                          ))
                        )
                      )}
                    </Paper>
                  ))}
                </AccordionDetails>
              </Accordion>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default LoadTable;
