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
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import LocationPinIcon from "./icons/LocationPinIcon";

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

// ---------- Projects Styles ----------
const ProjectsGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "32px",
  [theme.breakpoints.down("sm")]: { display: "none" },
}));

const ProjectCard = styled(Card)(({ theme }) => ({
  borderRadius: "16px",
  boxShadow: "0px 1px 2px rgba(133, 133, 133, 0.30)",
  overflow: "hidden",
  flexShrink: 0,
  [theme.breakpoints.down("sm")]: { width: "280px" },
}));

const ProjectImageContainer = styled(Box)({
  position: "relative",
  height: "200px",
});

const ProjectImage = styled(CardMedia)({
  height: "100%",
  position: "relative",
});

const ProjectBadges = styled(Stack)({
  position: "absolute",
  top: "16px",
  left: "16px",
  gap: "5px",
});

const ProjectBadge = styled(Chip)({
  background: "rgba(51, 83, 62, 0.55)",
  backdropFilter: "blur(2px)",
  color: "#fff",
  fontSize: "12px",
  fontWeight: 600,
  height: "24px",
  radius: "4px",
  padding: "4px",
});

const ProjectContent = styled(CardContent)({
  padding: "24px",
});

const ProjectInfo = styled(Stack)({
  marginBottom: "24px",
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const ProjectName = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const ProjectLocation = styled(Stack)({
  alignItems: "center",
  gap: "8px",
});

const LocationText = styled(Typography)(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.palette.text.primary,
}));

const DonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: "#ffffff",
  fontSize: "16px",
  fontWeight: 700,
  padding: "12px 24px",
  borderRadius: "8px",
  width: "100%",
  "&:hover": { backgroundColor: theme.palette.primary.dark },
}));

// ---------- Component ----------
const ProjectsSection: React.FC = () => {
  const projects = [
    {
      name: "K & S Associate",
      location: "Indore",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&crop=forest",
      badges: ["100+ planted", "Reforestation"],
    },
    {
      name: "Green Valley Initiative",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=200&fit=crop",
      badges: ["250+ planted", "Conservation"],
    },
    {
      name: "Urban Forest Project",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=200&fit=crop",
      badges: ["500+ planted", "Urban Forestry"],
    },
    {
      name: "Coastal Restoration",
      location: "Goa",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=200&fit=crop",
      badges: ["150+ planted", "Coastal Care"],
    },
    {
      name: "Hill Station Revival",
      location: "Shimla",
      image:
        "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=400&h=200&fit=crop",
      badges: ["300+ planted", "Mountain Forest"],
    },
    {
      name: "Desert Greening",
      location: "Rajasthan",
      image:
        "https://images.unsplash.com/photo-1615671524827-c1fe3973b648?w=400&h=200&fit=crop",
      badges: ["80+ planted", "Desert Recovery"],
    },
  ];

  return (
    <SectionContainer>
      <SectionHeader direction="row">
        <SectionTitle sx={{ mx: { xs: 0, sm: "auto" } }}>Projects</SectionTitle>
        <ViewAllButton sx={{ position: "absolute", right: 34 }}>
          View All
        </ViewAllButton>
      </SectionHeader>

      {/* Desktop Grid */}
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImageContainer>
              <ProjectImage image={project.image} title={project.name} />
              <ProjectBadges direction="row">
                {project.badges.map((badge, badgeIndex) => (
                  <ProjectBadge key={badgeIndex} label={badge} size="small" />
                ))}
              </ProjectBadges>
            </ProjectImageContainer>

            <ProjectContent>
              <ProjectInfo>
                <ProjectName>{project.name}</ProjectName>
                <ProjectLocation direction="row">
                  <LocationPinIcon width={13} height={16} color="#19212c" />
                  <LocationText>{project.location}</LocationText>
                </ProjectLocation>
              </ProjectInfo>
              <DonateButton variant="contained">DONATE</DonateButton>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>

      {/* Mobile Carousel */}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <MobileCarousel>
          <MobileCarouselInner>
            {projects.map((project, index) => (
              <ProjectCard key={index}>
                <ProjectImageContainer>
                  <ProjectImage image={project.image} title={project.name} />
                  <ProjectBadges direction="row">
                    {project.badges.map((badge, badgeIndex) => (
                      <ProjectBadge
                        key={badgeIndex}
                        label={badge}
                        size="small"
                      />
                    ))}
                  </ProjectBadges>
                </ProjectImageContainer>

                <ProjectContent>
                  <ProjectInfo>
                    <ProjectName>{project.name}</ProjectName>
                    <ProjectLocation direction="row">
                      <LocationPinIcon width={13} height={16} color="#19212c" />
                      <LocationText>{project.location}</LocationText>
                    </ProjectLocation>
                  </ProjectInfo>
                  <DonateButton variant="contained">DONATE</DonateButton>
                </ProjectContent>
              </ProjectCard>
            ))}
          </MobileCarouselInner>
        </MobileCarousel>
      </Box>
    </SectionContainer>
  );
};

export default ProjectsSection;
