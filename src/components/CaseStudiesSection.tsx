"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowRightIcon from "./icons/ArrowRightIcon";

const CaseStudiesContainer = styled(Box)(({ theme }) => ({
  padding: "64px 32px",

  [theme.breakpoints.down("sm")]: {
    padding: "32px 16px",
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  color: "#232d26",
  fontFamily: '"Playfair Display", serif',
  textAlign: "center",
  marginBottom: "40px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "24px",
    textAlign: "center",
    marginBottom: "24px",
  },
}));

const CaseStudiesGrid = styled(Stack)(({ theme }) => ({
  gap: "24px",
  marginBottom: "48px",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    gap: "16px",
    marginBottom: "32px",
  },
}));

const CaseStudyCard = styled(Card)(({ theme }) => ({
  width: "100%",
  maxWidth: "600px",
  borderRadius: "16px",
  border: "1px solid #e4e4e4",
  display: "flex",
  flexDirection: "row",
  overflow: "hidden",
  padding: "16px",
  gap: "24px",
  boxShadow: "none",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "100%",
    padding: "12px",
    gap: "12px",
    flexDirection: "row",
  },

  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  width: "245px",
  height: "304px",
  flexShrink: 0,
  borderRadius: "8px",
  overflow: "hidden",
  position: "relative",

  [theme.breakpoints.down("sm")]: {
    width: "120px",
    height: "150px",
  },

  [theme.breakpoints.down("xs")]: {
    width: "100%",
    height: "200px",
  },
}));

const CaseStudyImage = styled(Image)({
  objectFit: "cover",
});

const CaseStudyContent = styled(CardContent)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  padding: "0px",
  flex: 1,
  minWidth: 0, // Prevents flex item from overflowing

  [theme.breakpoints.down("sm")]: {
    gap: "12px",
  },

  "&:last-child": {
    paddingBottom: 0,
  },
}));

const LocationInfo = styled(Stack)({
  gap: "4px",
});

const LocationTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  color: "#333333",
  lineHeight: 1.2,

  [theme.breakpoints.down("sm")]: {
    fontSize: "16px",
  },
}));

const LocationSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: "#4b5563",
  lineHeight: 1.2,

  [theme.breakpoints.down("sm")]: {
    fontSize: "14px",
  },
}));

const CaseStudyDescription = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "#454950",
  flex: 1,
  display: "-webkit-box",
  WebkitLineClamp: 4,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",

  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
    lineHeight: "18px",
    WebkitLineClamp: 3,
  },
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  alignSelf: "flex-start",
  color: theme.palette.primary.main,
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: "8px 12px",
  borderRadius: "8px",
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: "transparent",
  minHeight: "auto",

  "&:hover": {
    backgroundColor: "rgba(0, 51, 153, 0.08)",
  },

  [theme.breakpoints.down("sm")]: {
    fontSize: "11px",
    padding: "6px 10px",
  },
}));

const NavigationControls = styled(Stack)(({ theme }) => ({
  justifyContent: "space-between",
  alignItems: "center",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
  },
}));

const ProgressIndicators = styled(Stack)(({ theme }) => ({
  gap: "8px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
}));

const ProgressBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active, theme }) => ({
  width: "538px",
  height: "4px",
  backgroundColor: active ? theme.palette.primary.main : "#d1d1d1",
  borderRadius: "2px",

  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: "200px",
  },
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(0, 51, 153, 0.1)",
  color: theme.palette.primary.main,
  width: "42px",
  height: "42px",

  "&:hover": {
    backgroundColor: "rgba(0, 51, 153, 0.2)",
  },

  [theme.breakpoints.down("sm")]: {
    width: "36px",
    height: "36px",
  },
}));

const CaseStudiesSection: React.FC = () => {
  const caseStudies = [
    {
      title: "Satna, CoNPCI",
      subtitle: "Madhya Pradesh",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor.",
      image: "/images/case-study-mountain.png",
    },
    {
      title: "Satna, CoNPCI",
      subtitle: "Madhya Pradesh",
      description:
        "Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor.",
      image: "/images/case-study-field.png",
    },
  ];

  return (
    <CaseStudiesContainer>
      <SectionTitle>Case Study</SectionTitle>

      <CaseStudiesGrid direction={{ xs: "column", sm: "row" }}>
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={index}>
            <ImageContainer>
              <CaseStudyImage
                src={study.image}
                alt={study.title}
                fill
                sizes="(max-width: 600px) 120px, 245px"
              />
            </ImageContainer>

            <CaseStudyContent>
              <LocationInfo>
                <LocationTitle>{study.title}</LocationTitle>
                <LocationSubtitle>{study.subtitle}</LocationSubtitle>
              </LocationInfo>

              <CaseStudyDescription>{study.description}</CaseStudyDescription>

              <ReadMoreButton
                endIcon={
                  <ArrowRightIcon width={16} height={16} color="#003399" />
                }
              >
                Read more
              </ReadMoreButton>
            </CaseStudyContent>
          </CaseStudyCard>
        ))}
      </CaseStudiesGrid>

      <NavigationControls direction="row" display="none">
        <ProgressIndicators direction="row">
          <ProgressBar active />
          <ProgressBar />
        </ProgressIndicators>

        <Stack direction="row" spacing={1}>
          <NavButton>
            <ArrowBackIcon />
          </NavButton>
          <NavButton>
            <ArrowForwardIcon />
          </NavButton>
        </Stack>
      </NavigationControls>
    </CaseStudiesContainer>
  );
};

export default CaseStudiesSection;
