"use client";
import React from "react";
import { Box, Typography, Stack, Divider } from "@mui/material";
import { styled } from "@mui/material/styles";
import LandscapeIcon from "./icons/LandscapeIcon";
import TreeSpeciesIcon from "./icons/TreeSpeciesIcon";
import EndangeredSpeciesIcon from "./icons/EndangeredSpeciesIcon";
import Co2OffsetIcon from "./icons/Co2OffsetIcon";
import StatesProjectsIcon from "./icons/StatesProjectsIcon";
import LakesRestoredIcon from "./icons/LakesRestoredIcon";

const StatsContainer = styled(Box)(({ theme }) => ({
  width: "92%",
  margin: "0 auto",
  borderRadius: 16,
  boxShadow: "0px 8px 32px rgba(133, 133, 133, 0.10)",
  background: "#fff",
  padding: "32px",
  position: "relative",
  top: -48,
  zIndex: 2,
  gap: "64px",
  display: "flex",
  flexDirection: "column",

  [theme.breakpoints.down("sm")]: {
    padding: "20px",
    gap: "32px",
  },
}));

const StatsRow = styled(Stack)(({ theme }) => ({
  justifyContent: "space-around",
  alignItems: "center",
  gap: "32px",

  [theme.breakpoints.down("sm")]: {
    // Keep row direction for 2-column layout
    flexDirection: "row",
    gap: "16px",
    justifyContent: "space-between",
  },
}));

const StatItem = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  textAlign: "center",
  gap: "16px",
  flex: 1,

  [theme.breakpoints.down("sm")]: {
    gap: "8px",
    flex: 1,
  },
}));

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: "40px",
  fontWeight: 600,
  lineHeight: "36px",
  color: theme.palette.text.primary,

  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    lineHeight: "28px",
  },
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 400,
  color: theme.palette.text.secondary,

  [theme.breakpoints.down("sm")]: {
    fontSize: "12px",
    lineHeight: "16px",
  },
}));

const VerticalDivider = styled(Divider)(({ theme }) => ({
  height: "97px",
  backgroundColor: "#d1d5db",

  [theme.breakpoints.down("sm")]: {
    height: "80px",
  },
}));

const StatIcon = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    width: "32px",
    height: "32px",
  },
}));

const StatisticsSection: React.FC = () => {
  const topRowStats = [
    {
      icon: <LandscapeIcon width={40} height={40} color="#206f32" />,
      mobileIcon: <LandscapeIcon width={32} height={32} color="#206f32" />,
      number: "10,000+",
      label: "Acres Afforested",
    },
    {
      icon: <TreeSpeciesIcon width={36} height={36} color="#206f32" />,
      mobileIcon: <TreeSpeciesIcon width={28} height={28} color="#206f32" />,
      number: "330+",
      label: "Native Tree Species Planted",
    },
    {
      icon: <EndangeredSpeciesIcon width={36} height={36} color="#206f32" />,
      mobileIcon: (
        <EndangeredSpeciesIcon width={28} height={28} color="#206f32" />
      ),
      number: "80+",
      label: "Endangered Species Curated",
    },
  ];

  const bottomRowStats = [
    {
      icon: <Co2OffsetIcon width={40} height={40} color="#206f32" />,
      mobileIcon: <Co2OffsetIcon width={32} height={32} color="#206f32" />,
      number: "64,000+",
      label: "Tons of CO2 Offset",
    },
    {
      icon: <StatesProjectsIcon width={36} height={40} color="#206f32" />,
      mobileIcon: <StatesProjectsIcon width={28} height={32} color="#206f32" />,
      number: "12+",
      label: "States with Implemented Projects",
    },
    {
      icon: <LakesRestoredIcon width={40} height={40} color="#206f32" />,
      mobileIcon: <LakesRestoredIcon width={32} height={32} color="#206f32" />,
      number: "35+",
      label: "Lakes Created and Restored",
    },
  ];

  // For mobile, we'll create a different layout structure
  const MobileLayout = () => (
    <>
      {/* Row 1: First 2 items */}
      <StatsRow direction="row" margin="0 0 40px 0">
        <StatItem>
          <StatIcon>{topRowStats[0].mobileIcon}</StatIcon>
          <StatNumber>{topRowStats[0].number}</StatNumber>
          <StatLabel>{topRowStats[0].label}</StatLabel>
        </StatItem>
        <VerticalDivider orientation="vertical" />
        <StatItem>
          <StatIcon>{topRowStats[1].mobileIcon}</StatIcon>
          <StatNumber>{topRowStats[1].number}</StatNumber>
          <StatLabel>{topRowStats[1].label}</StatLabel>
        </StatItem>
      </StatsRow>

      {/* Row 2: Items 3 and 4 */}
      <StatsRow direction="row" margin="0 0 40px 0">
        <StatItem>
          <StatIcon>{topRowStats[2].mobileIcon}</StatIcon>
          <StatNumber>{topRowStats[2].number}</StatNumber>
          <StatLabel>{topRowStats[2].label}</StatLabel>
        </StatItem>
        <VerticalDivider orientation="vertical" />
        <StatItem>
          <StatIcon>{bottomRowStats[0].mobileIcon}</StatIcon>
          <StatNumber>{bottomRowStats[0].number}</StatNumber>
          <StatLabel>{bottomRowStats[0].label}</StatLabel>
        </StatItem>
      </StatsRow>

      {/* Row 3: Last 2 items */}
      <StatsRow direction="row">
        <StatItem>
          <StatIcon>{bottomRowStats[1].mobileIcon}</StatIcon>
          <StatNumber>{bottomRowStats[1].number}</StatNumber>
          <StatLabel>{bottomRowStats[1].label}</StatLabel>
        </StatItem>
        <VerticalDivider orientation="vertical" />
        <StatItem>
          <StatIcon>{bottomRowStats[2].mobileIcon}</StatIcon>
          <StatNumber>{bottomRowStats[2].number}</StatNumber>
          <StatLabel>{bottomRowStats[2].label}</StatLabel>
        </StatItem>
      </StatsRow>
    </>
  );

  // Desktop layout (original)
  const DesktopLayout = () => (
    <>
      <StatsRow direction="row" margin="0 0 56px 0">
        {topRowStats.map((stat, index) => (
          <React.Fragment key={index}>
            <StatItem>
              <StatIcon>{stat.icon}</StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
            {index < topRowStats.length - 1 && (
              <VerticalDivider orientation="vertical" />
            )}
          </React.Fragment>
        ))}
      </StatsRow>

      <StatsRow direction="row">
        {bottomRowStats.map((stat, index) => (
          <React.Fragment key={index}>
            <StatItem>
              <StatIcon>{stat.icon}</StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
            {index < bottomRowStats.length - 1 && (
              <VerticalDivider orientation="vertical" />
            )}
          </React.Fragment>
        ))}
      </StatsRow>
    </>
  );

  return (
    <StatsContainer>
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <DesktopLayout />
      </Box>
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobileLayout />
      </Box>
    </StatsContainer>
  );
};

export default StatisticsSection;
