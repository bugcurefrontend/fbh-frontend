"use client";
import React from "react";
import { Box, Typography, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import ArrowRightIcon from "./icons/ArrowRightIcon";

const AboutContainer = styled(Stack)(({ theme }) => ({
  gap: "32px",
  padding: "64px 32px",
  alignItems: "center",

  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
    padding: "40px 20px",
  },
}));

const AboutImage = styled(Image)(({ theme }) => ({
  borderRadius: "16px",
  objectFit: "cover",

  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: "auto !important",
  },
}));

const AboutContent = styled(Stack)(({ theme }) => ({
  gap: "24px",
  flex: 1,
  maxWidth: "556px",

  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
    alignItems: "center",
  },
}));

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontFamily: '"Playfair Display", serif',

  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
  },
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  lineHeight: "24px",
  color: theme.palette.text.primary,

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const KnowMoreButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  color: theme.palette.primary.main,
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: "12px 16px",
  borderRadius: "8px",
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: "transparent",
  "&:hover": {
    backgroundColor: "rgba(0, 51, 153, 0.08)",
  },

  [theme.breakpoints.down("md")]: {
    alignSelf: "center",
  },
}));

const AboutSection: React.FC = () => {
  return (
    <AboutContainer direction="row">
      <AboutImage
        src="/images/architecture-circular.png"
        alt="Circular architecture with gardens"
        width={588}
        height={404}
      />

      <AboutContent>
        <AboutTitle>What is Forests By Heartfulness?</AboutTitle>

        <AboutDescription>
          Forests By Heartfulness is rejuvenating Earth's native, endangered,
          and endemic species through green action, cutting-edge research,
          ecological empathy and a reconnection between humans and nature.
        </AboutDescription>

        <KnowMoreButton
          endIcon={<ArrowRightIcon width={22} height={22} color="#003399" />}
        >
          Know More
        </KnowMoreButton>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;
