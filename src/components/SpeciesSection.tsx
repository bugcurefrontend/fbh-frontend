"use client";
import React from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Card,
  CardContent,
  CardMedia,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowRightIcon from "./icons/ArrowRightIcon";

// ---------- Common Styles ----------
const SectionContainer = styled(Box)({
  padding: "64px 32px",
});

const SectionHeader = styled(Stack)({
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
  minHeight: "48px",
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontFamily: '"Playfair Display", serif',
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
}));

// ---------- Mobile Carousel ----------
const MobileCarousel = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    overflowX: "auto",
    "&::-webkit-scrollbar": { display: "none" },
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },
}));

const MobileCarouselInner = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    flexDirection: "row",
    gap: "16px",
    paddingBottom: "8px",
    width: "max-content",
  },
}));

// ---------- Species Styles ----------
const SpeciesGrid = styled(Stack)(({ theme }) => ({
  gap: "32px",
  marginBottom: "48px",
  [theme.breakpoints.down("sm")]: { display: "none" },
}));

const SpeciesCard = styled(Card)(({ theme }) => ({
  width: "384px",
  borderRadius: "16px",
  border: "1px solid #e4e4e4",
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: { width: "280px" },
}));

const SpeciesImage = styled(CardMedia)({
  margin: "13px 13px 0px 13px",
  height: "194px",
  borderRadius: "8px",
});

const SpeciesContent = styled(CardContent)({
  padding: "16px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

const SpeciesName = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const KnowMoreButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: "12px",
  fontWeight: 700,
  textTransform: "uppercase",
  minWidth: "auto",
}));

const NavigationControls = styled(Stack)({
  justifyContent: "space-between",
  alignItems: "center",
});

const ProgressIndicators = styled(Stack)({
  gap: "8px",
});

const ProgressBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== "active",
})<{ active?: boolean }>(({ active, theme }) => ({
  width: "538px",
  height: "4px",
  backgroundColor: active ? theme.palette.primary.main : "#d1d1d1",
  borderRadius: "2px",
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(0, 51, 153, 0.1)",
  color: theme.palette.primary.main,
  width: "42px",
  height: "42px",
  "&:hover": { backgroundColor: "rgba(0, 51, 153, 0.2)" },
}));

// ---------- Component ----------
const SpeciesSection: React.FC = () => {
  const species = [
    {
      name: "Neem (Azadirachta)",
      image: "/images/neem-tree.jpg",
    },
    {
      name: "Banyan Tree",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=200&fit=crop",
    },
    {
      name: "Mango Tree",
      image:
        "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=400&h=200&fit=crop",
    },
  ];

  return (
    <SectionContainer>
      <SectionHeader direction="row">
        <SectionTitle sx={{ mx: { xs: 0, sm: "auto" } }}>Species</SectionTitle>
        <ViewAllButton sx={{ position: "absolute", right: 34 }}>
          View All
        </ViewAllButton>
      </SectionHeader>

      {/* Desktop */}
      <SpeciesGrid direction={{ xs: "column", sm: "row" }}>
        {species.map((item, index) => (
          <SpeciesCard key={index}>
            <SpeciesImage image={item.image} title={item.name} />
            <SpeciesContent>
              <SpeciesName>{item.name}</SpeciesName>
              <KnowMoreButton
                endIcon={
                  <ArrowRightIcon width={22} height={22} color="#003399" />
                }
              >
                Know More
              </KnowMoreButton>
            </SpeciesContent>
          </SpeciesCard>
        ))}
      </SpeciesGrid>

      {/* Mobile */}
      <Box sx={{ display: { xs: "block", sm: "none" }, mb: 6 }}>
        <MobileCarousel>
          <MobileCarouselInner>
            {species.map((item, index) => (
              <SpeciesCard key={index}>
                <SpeciesImage image={item.image} title={item.name} />
                <SpeciesContent>
                  <SpeciesName>{item.name}</SpeciesName>
                  <KnowMoreButton
                    endIcon={
                      <ArrowRightIcon width={22} height={22} color="#003399" />
                    }
                  >
                    Know More
                  </KnowMoreButton>
                </SpeciesContent>
              </SpeciesCard>
            ))}
          </MobileCarouselInner>
        </MobileCarousel>
      </Box>

      {/* Desktop Navigation */}
      <NavigationControls direction="row" display={{ xs: "none", sm: "flex" }}>
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
    </SectionContainer>
  );
};

export default SpeciesSection;
