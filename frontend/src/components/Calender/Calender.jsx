import React, { useState } from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { pickersLayoutClasses } from "@mui/x-date-pickers";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import "./Calender.css";
import Attendence from "../Attendence/Attendence";
import CustomPaginationActionsTable from "../AttendanceList/AttendanceList";

export default function ResponsiveDateRangePickers({ subjectId }) {
  const [selectedDateRange, setSelectedDateRange] = useState([
    dayjs("2022-04-17"),
    dayjs("2022-04-21"),
  ]);
  const [openDialog, setOpenDialog] = useState(false);

  const handleDateRangeChange = (val) => {
    setSelectedDateRange(val);
  };

  const handleAccept = (newValue) => {
    console.log("User clicked OK with date range:", newValue);
    setOpenDialog(true);
    // Perform your action here, e.g., send the selected date range to an API
  };

  const handleCancel = (reason) => {
    if (reason === "cancel") {
      console.log("User clicked Cancel");
      window.alert("User clicked Cancel");
      // Perform your action here, e.g., reset the selected date range
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="contained" sx={{ margin: "1rem 0 0.5rem 1rem " }}>
        Back to home Page
      </Button>
      <DemoContainer
        components={[
          "DateRangePicker",
          "MobileDateRangePicker",
          "DesktopDateRangePicker",
          "StaticDateRangePicker",
        ]}
        sx={{ padding: "1rem" }}
      >
        <DemoItem label="" component="StaticDateRangePicker">
          <StaticDateRangePicker
            onAccept={handleAccept}
            value={selectedDateRange}
            onCancel={(event, reason) => handleCancel(reason)}
            onChange={handleDateRangeChange}
            defaultValue={[dayjs("2022-04-17"), dayjs("2022-04-21")]}
            sx={{
              [`.${pickersLayoutClasses.contentWrapper}`]: {
                alignItems: "center",
              },
            }}
          />
        </DemoItem>
      </DemoContainer>
      {/* Dialog Component */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Date Range Selected</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {/* You have selected a date range from{" "}
            {selectedDateRange[0].format("YYYY-MM-DD")} to{" "}
            {selectedDateRange[1].format("YYYY-MM-DD")}. */}
            <CustomPaginationActionsTable
              from={selectedDateRange[0]}
              to={selectedDateRange[1]}
              subjectId={subjectId}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
}
