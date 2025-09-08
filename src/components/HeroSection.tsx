"use client";
import React from "react";
import { Box, Typography, Button, Paper, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
  DisplaySettings,
  KeyboardArrowLeft,
  KeyboardArrowRight,
} from "@mui/icons-material";
import Image from "next/image";

const HeroContainer = styled(Box)(({ theme }) => ({
  height: "604px",
  backgroundImage:
    'linear-gradient(0deg, rgba(0, 13, 38, 0.30), rgba(0, 13, 38, 0.30)), url("/images/hero-forest-bg.png")',
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  display: "flex",
  alignItems: "center",
  position: "relative",
  paddingTop: "80px",

  [theme.breakpoints.down("sm")]: {
    height: "403px",
    paddingTop: "60px",
  },
}));

const HeroContent = styled(Box)(({ theme }) => ({
  maxWidth: "582px",

  [theme.breakpoints.down("sm")]: { maxWidth: "276px" },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: "64px",
  fontWeight: 700,
  lineHeight: "76.8px",
  color: "#ffffff",
  marginBottom: "40px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "38px",
    lineHeight: "36px",
    marginBottom: "24px",
    width: "276px",
  },
}));

const PlantButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 700,
  width: "360px",
  borderRadius: "8px",
  "&:hover": {
    backgroundColor: theme.palette.primary.dark,
  },

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    fontSize: "14px",
    padding: "6px 16px",
  },
}));

const NavigationControls = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "32px",
  bottom: "0",
  display: "flex",
  gap: "12px",

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

const NavButton = styled(IconButton)<{ variant?: "filled" | "outlined" }>(
  ({ theme, variant }) => ({
    width: 42,
    height: 42,
    borderRadius: "50%",
    border: variant === "outlined" ? "1px solid rgba(255,255,255,0.6)" : "none",
    backgroundColor: variant === "filled" ? "#fff" : "transparent",
    color: variant === "filled" ? "#000" : "rgba(255,255,255,0.8)",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor:
        variant === "filled"
          ? "rgba(255,255,255,0.8)"
          : "rgba(255,255,255,0.2)",
    },
  })
);

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <Box
        maxWidth={1200}
        mx="auto"
        width="100%"
        position="relative"
        padding={{ xs: "8px 16px", sm: "0 32px" }}
      >
        <HeroContent>
          <HeroTitle>Putting heart back into the Earth</HeroTitle>
          <PlantButton variant="contained">PLANT A TREE</PlantButton>
        </HeroContent>

        <Box display="flex" justifyContent="center" mt={6}>
          <Image src="/images/dots.png" alt="dots" width={48} height={8} />
        </Box>

        <NavigationControls>
          <NavButton variant="outlined">
            <KeyboardArrowLeft />
          </NavButton>
          <NavButton variant="filled">
            <KeyboardArrowRight />
          </NavButton>
        </NavigationControls>
      </Box>
    </HeroContainer>
  );
};

export default HeroSection;
