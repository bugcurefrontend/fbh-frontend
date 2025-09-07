'use client';
import React from 'react';
import { Box, Typography, Button, Stack, Paper, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const HeroContainer = styled(Box)({
  height: '604px',
  backgroundImage: 'linear-gradient(0deg, rgba(0, 13, 38, 0.30), rgba(0, 13, 38, 0.30)), url("/images/hero-forest-bg.png")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
  paddingTop: '80px'
});

const MissionDropdown = styled(Paper)(({ theme }) => ({
  position: 'absolute',
  top: '80px',
  left: '280px',
  width: '176px',
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0px 24px 48px rgba(133, 133, 133, 0.20)',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)'
}));

const MissionItem = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 600,
  color: theme.palette.text.secondary,
  padding: '8px 0',
  cursor: 'pointer',
  '&:hover': {
    color: theme.palette.primary.main
  }
}));

const HeroContent = styled(Box)({
  marginLeft: '59px',
  maxWidth: '582px'
});

const HeroTitle = styled(Typography)(({ theme }) => ({
  fontSize: '64px',
  fontWeight: 700,
  lineHeight: '76.8px',
  color: '#ffffff',
  marginBottom: '40px'
}));

const PlantButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 700,
  padding: '16px 32px',
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const NavigationControls = styled(Box)({
  position: 'absolute',
  right: '32px',
  bottom: '80px',
  display: 'flex',
  gap: '12px'
});

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  color: '#ffffff',
  width: '42px',
  height: '42px',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.3)'
  }
}));

const HeroSection: React.FC = () => {
  return (
    <HeroContainer>
      <MissionDropdown>
        <Stack spacing={1}>
          <MissionItem>Our Mission & Vision</MissionItem>
          <MissionItem>Meet The Team</MissionItem>
          <MissionItem>FAQs</MissionItem>
        </Stack>
      </MissionDropdown>

      <HeroContent>
        <HeroTitle>
          Putting heart back into the Earth
        </HeroTitle>
        <PlantButton variant="contained">
          PLANT A TREE
        </PlantButton>
      </HeroContent>

      <NavigationControls>
        <NavButton>
          <ArrowBackIcon />
        </NavButton>
        <NavButton>
          <ArrowForwardIcon />
        </NavButton>
      </NavigationControls>
    </HeroContainer>
  );
};

export default HeroSection;