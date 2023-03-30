import React, { useState } from "react";
import {
  Box,
  useTheme,
  Select,
  FormControl,
  MenuItem,
  InputLabel,
} from "@mui/material";
import Header from "components/Header";

import { InfinitySpin } from "react-loader-spinner";
import OverviewChart from "components/OverviewChart";

const Overview = () => {
  const [view, setView] = useState("units");
  return (
    <Box m="1.25rem 2.5rem">
      <Header
        title="SALES OVERVIEW"
        subtitle="See all your sales information"
      />

      <Box height="75vh">
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
            value={view}
            label="View"
            onChange={(e) => setView(e.target.value)}>
            <MenuItem value="sales">Sales</MenuItem>
            <MenuItem value="units">Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
