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
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const ActivitiesContainer = styled(Box)({
  padding: "64px 32px",
});

const SectionHeader = styled(Stack)({
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "32px",
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

const ActivitiesGrid = styled(Stack)({
  gap: "32px",
  marginBottom: "48px",
});

const ActivityCard = styled(Card)({
  width: "384px",
  borderRadius: "16px",
  border: "1px solid #e4e4e4",
});

const ActivityImage = styled(CardMedia)({
  height: "192px",
});

const ActivityContent = styled(CardContent)({
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
});

const DateContainer = styled(Stack)({
  alignItems: "center",
  gap: "8px",
});

const DateIcon = styled(CalendarTodayIcon)(({ theme }) => ({
  width: "20px",
  height: "20px",
  color: theme.palette.primary.main,
}));

const DateText = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 700,
  color: theme.palette.text.primary,
}));

const ActivityTitle = styled(Typography)(({ theme }) => ({
  fontSize: "18px",
  fontWeight: 700,
  color: "#333333",
}));

const ActivityDescription = styled(Typography)(({ theme }) => ({
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "21px",
  color: "#595959",
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
  width: "500px",
  height: "4px",
  backgroundColor: active ? theme.palette.primary.main : "#d1d1d1",
  borderRadius: "2px",
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: "rgba(0, 51, 153, 0.1)",
  color: theme.palette.primary.main,
  width: "42px",
  height: "42px",
  "&:hover": {
    backgroundColor: "rgba(0, 51, 153, 0.2)",
  },
}));

const ActivitiesSection: React.FC = () => {
  const activities = [
    {
      date: "15 JAN",
      title: "Gym Facilities for practitioners",
      description:
        "Kanha Gym is equipped with world-class fitness facilities. Gym offers the options to workout pla…",
      image: "/images/gym-facilities.png",
    },
    {
      date: "15 JAN",
      title: "Kanha Sports Centre inaugurated",
      description:
        "An Kanha Sports Centre at Kanha Shanti Vanam, established by the Ministry of Sports, Khelo India, …",
      image: "/images/sports-centre.jpg",
    },
    {
      date: "15 JAN",
      title: "Talent Identification, Physical Literacy key to",
      description:
        "India's Chief National Badminton Coach Pullela Gopichand says…",
      image: "/images/badminton-coach.jpg",
    },
  ];

  return (
    <ActivitiesContainer>
      <SectionHeader direction="row" position="relative">
        <SectionTitle
          sx={{
            mx: { xs: 0, sm: "auto" },
          }}
        >
          FBG Activities
        </SectionTitle>
        <ViewAllButton sx={{ position: "absolute", right: 0 }}>
          View All
        </ViewAllButton>
      </SectionHeader>

      <ActivitiesGrid direction={{ xs: "column", sm: "row" }}>
        {activities.map((activity, index) => (
          <ActivityCard key={index}>
            <ActivityImage image={activity.image} title={activity.title} />
            <ActivityContent>
              <DateContainer direction="row">
                <DateIcon />
                <DateText>{activity.date}</DateText>
              </DateContainer>

              <ActivityTitle>{activity.title}</ActivityTitle>

              <ActivityDescription>{activity.description}</ActivityDescription>
            </ActivityContent>
          </ActivityCard>
        ))}
      </ActivitiesGrid>

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
    </ActivitiesContainer>
  );
};

export default ActivitiesSection;
