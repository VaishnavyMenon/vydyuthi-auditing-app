import React from "react";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";
import ButtonComponent from "../components/Button";

const ExcelGenerator = ({ jsonData }) => {
  const generateExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Energy Audit");

    // Define load categories
    const loadCategories = ["light", "ventilation", "system", "pump", "airConditioner"];

    // Extract unique load names in a case-insensitive manner
    let uniqueLoadNamesMap = new Map(); // Stores original case for display

    loadCategories.forEach(category => {
      jsonData.buildings.forEach(building => {
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
    });

    // Convert map to array (preserving order and original case)
    const uniqueLoadNames = Array.from(uniqueLoadNamesMap.values());

    // First Row: Headers (Vertical Text)
    let firstRow = ["Appliance", ...uniqueLoadNames.flatMap(name => [name, "", ""])];
    let headerRow = worksheet.addRow(firstRow);
    headerRow.height = 100; // Increase row height for vertical text
    headerRow.eachCell((cell, colNumber) => {
      cell.font = { name: "Calibri Light", bold: true, size: 11 };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "c5e0b3" } }; // Light Green background
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      if (colNumber > 1) cell.alignment = { textRotation: 90, horizontal: "center", vertical: "middle" }; // Rotate text
    });

    // Second Row: Sub-Headers
    let secondRow = ["Name of Building/Room", ...uniqueLoadNames.flatMap(() => ["nos", "hrs/day", "total hrs"])];
    let subHeaderRow = worksheet.addRow(secondRow);
    subHeaderRow.height = 70; // Increase row height for vertical text
    subHeaderRow.width = 60;
    subHeaderRow.eachCell((cell, colNumber) => {
      cell.font = { name: "Calibri Light", bold: true, size: 11 };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "c5e0b3" } }; // Light Green background
      cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      if (colNumber > 1) cell.alignment = { textRotation: 90, horizontal: "center", vertical: "middle" }; // Rotate text
    });

    // Merge only the load name headers (Skip merging "Appliance" and "Name of Building/Room")
    let colIndex = 2;
    uniqueLoadNames.forEach(() => {
      worksheet.mergeCells(1, colIndex, 1, colIndex + 2); // Merge load name cells
      colIndex += 3;
    });

    // Fill Data with Hierarchy & Colors
    jsonData.buildings.forEach((building) => {
      // Building row
      let buildingRow = [building.name, ...Array(firstRow.length - 1).fill("0")];
      let row = worksheet.addRow(buildingRow);
      row.font = { name: "Calibri Light", bold: true, size: 9 };
      row.eachCell((cell) => {
        cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "bdd6ee" } }; // Light Blue background
        cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
      });

      building.floors.forEach((floor) => {
        // Floor row
        let floorRow = [`   ${floor.floorNumber}`, ...Array(firstRow.length - 1).fill("0")];
        let row = worksheet.addRow(floorRow);
        row.font = { name: "Calibri Light", italic: false, size: 9 };
        row.eachCell((cell) => {
          cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "ffff99" } }; // Light Yellow background
          cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
        });

        floor.rooms.forEach((room) => {
          let rowData = Array(firstRow.length).fill("0"); // Fill empty cells with 0
          rowData[0] = `      ${room.roomName}`; // Room Name Indentation

          // Populate loads in correct order (Using case-insensitive match)
          loadCategories.forEach((category) => {
            if (room.loads[category] && room.loads[category].length > 0) {
              room.loads[category].forEach((loadGroup) => {
                loadGroup.forEach((load) => {
                  let lowerCaseName = load.loadName.toLowerCase();
                  let index = firstRow.indexOf(uniqueLoadNamesMap.get(lowerCaseName)); // Find column position using mapped name
                  if (index !== -1) {
                    rowData[index] = load.quantity;
                    rowData[index + 1] = load.hoursPerDay;
                    rowData[index + 2] = load.quantity * load.hoursPerDay; // Total Hrs
                  }
                });
              });
            }
          });

          let row = worksheet.addRow(rowData);
          row.font = { name: "Calibri Light", size: 9 }; // Apply font to room data rows
          row.eachCell((cell) => {
            cell.border = { top: { style: "thin" }, left: { style: "thin" }, bottom: { style: "thin" }, right: { style: "thin" } };
          });
        });
      });
    });

    // Adjust Column Width
    worksheet.columns.forEach((column, i) => {
      column.width = i === 0 ? 25 : 5;
    });

    // Generate and download the Excel file
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(blob, "Energy_Audit.xlsx");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <ButtonComponent variant="primary" onClick={generateExcel}>Export Data</ButtonComponent>
    </div>
  );
};

export default ExcelGenerator;
