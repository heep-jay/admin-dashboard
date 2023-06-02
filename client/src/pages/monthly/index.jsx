import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { useGetSalesDataQuery } from "state/api";
import "react-datepicker/dist/react-datepicker.css";
import { ResponsiveLine } from "@nivo/line";
import { InfinitySpin } from "react-loader-spinner";

const Monthly = () => {
  const { data } = useGetSalesDataQuery();
  const theme = useTheme();
  const isDashboard = false;

  const [formattedData] = useMemo(() => {
    if (!data) return [];

    const { monthlyData } = data;
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    };

    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        { x: month, y: totalSales },
      ];
      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        { x: month, y: totalUnits },
      ];
    });
    const formattedData = [totalSalesLine, totalUnitsLine];
    return [formattedData];
  }, [data, theme]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="MONTHLY SALES" subtitle="Charts of monthly sales" />
      <Box height="75vh">
        {data ? (
          <ResponsiveLine
            data={formattedData}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary[200],
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary[200],
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            curve="catmullRom"
            enableArea={isDashboard}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              format: (v) => {
                if (isDashboard) return v.slice(0, 3);
                return v;
              },
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: isDashboard ? "" : "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickValues: 5,
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={
              !isDashboard
                ? [
                    {
                      anchor: "top-right",
                      direction: "column",
                      justify: false,
                      translateX: 30,
                      translateY: -40,
                      itemsSpacing: 0,
                      itemDirection: "left-to-right",
                      itemWidth: 80,
                      itemHeight: 20,
                      itemOpacity: 0.75,
                      symbolSize: 12,
                      symbolShape: "circle",
                      symbolBorderColor: "rgba(0, 0, 0, .5)",
                      effects: [
                        {
                          on: "hover",
                          style: {
                            itemBackground: "rgba(0, 0, 0, .03)",
                            itemOpacity: 1,
                          },
                        },
                      ],
                    },
                  ]
                : undefined
            }
          />
        ) : (
          <Box
            display="flex"
            height="80vh"
            alignItems="center"
            justifyContent="center"
          >
            <InfinitySpin width="200" color={theme.palette.secondary[300]} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Monthly;
