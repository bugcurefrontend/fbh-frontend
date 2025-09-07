'use client';
import React from 'react';
import { Box, Typography, Stack, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import LandscapeIcon from './icons/LandscapeIcon';
import TreeSpeciesIcon from './icons/TreeSpeciesIcon';
import EndangeredSpeciesIcon from './icons/EndangeredSpeciesIcon';
import Co2OffsetIcon from './icons/Co2OffsetIcon';
import StatesProjectsIcon from './icons/StatesProjectsIcon';
import LakesRestoredIcon from './icons/LakesRestoredIcon';

const StatsContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '64px 32px',
  display: 'flex',
  flexDirection: 'column',
  gap: '56px'
}));

const StatsRow = styled(Stack)({
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: '32px'
});

const StatItem = styled(Stack)({
  alignItems: 'center',
  textAlign: 'center',
  gap: '16px',
  flex: 1
});

const StatNumber = styled(Typography)(({ theme }) => ({
  fontSize: '40px',
  fontWeight: 600,
  lineHeight: '36px',
  color: theme.palette.text.primary
}));

const StatLabel = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  color: theme.palette.text.secondary,
  maxWidth: '200px'
}));

const VerticalDivider = styled(Divider)({
  height: '97px',
  backgroundColor: '#d1d5db'
});

const StatIcon = styled(Box)({
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const StatisticsSection: React.FC = () => {
  const topRowStats = [
    {
      icon: <LandscapeIcon width={40} height={40} color="#206f32" />,
      number: '10,000+',
      label: 'Acres Afforested'
    },
    {
      icon: <TreeSpeciesIcon width={36} height={36} color="#206f32" />,
      number: '330+',
      label: 'Native Tree Species Planted'
    },
    {
      icon: <EndangeredSpeciesIcon width={36} height={36} color="#206f32" />,
      number: '80+',
      label: 'Endangered Species Curated'
    }
  ];

  const bottomRowStats = [
    {
      icon: <Co2OffsetIcon width={40} height={40} color="#206f32" />,
      number: '64,000+',
      label: 'Tons of CO2 Offset'
    },
    {
      icon: <StatesProjectsIcon width={36} height={40} color="#206f32" />,
      number: '12+',
      label: 'States with Implemented Projects'
    },
    {
      icon: <LakesRestoredIcon width={40} height={40} color="#206f32" />,
      number: '35+',
      label: 'Lakes Created and Restored'
    }
  ];

  return (
    <StatsContainer>
      <StatsRow direction="row">
        {topRowStats.map((stat, index) => (
          <React.Fragment key={index}>
            <StatItem>
              <StatIcon>{stat.icon}</StatIcon>
              <StatNumber>{stat.number}</StatNumber>
              <StatLabel>{stat.label}</StatLabel>
            </StatItem>
            {index < topRowStats.length - 1 && <VerticalDivider orientation="vertical" />}
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
            {index < bottomRowStats.length - 1 && <VerticalDivider orientation="vertical" />}
          </React.Fragment>
        ))}
      </StatsRow>
    </StatsContainer>
  );
};

export default StatisticsSection;