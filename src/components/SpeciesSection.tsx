'use client';
import React from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, CardMedia, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from './icons/ArrowRightIcon';

const SpeciesContainer = styled(Box)({
  padding: '64px 32px'
});

const SectionHeader = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '32px'
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontFamily: '"Playfair Display", serif'
}));

const ViewAllButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase'
}));

const SpeciesGrid = styled(Stack)({
  gap: '32px',
  marginBottom: '48px'
});

const SpeciesCard = styled(Card)({
  width: '384px',
  borderRadius: '16px',
  border: '1px solid #e4e4e4'
});

const SpeciesImage = styled(CardMedia)({
  height: '194px',
  borderRadius: '8px'
});

const SpeciesContent = styled(CardContent)({
  padding: '16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
});

const SpeciesName = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  color: theme.palette.text.primary
}));

const KnowMoreButton = styled(Button)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: '8px 16px',
  borderRadius: '8px',
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: 'transparent',
  minWidth: 'auto'
}));

const NavigationControls = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'center'
});

const ProgressIndicators = styled(Stack)({
  gap: '8px'
});

const ProgressBar = styled(Box)<{ active?: boolean }>(({ active, theme }) => ({
  width: '538px',
  height: '4px',
  backgroundColor: active ? theme.palette.primary.main : '#d1d1d1',
  borderRadius: '2px'
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: 'rgba(0, 51, 153, 0.1)',
  color: theme.palette.primary.main,
  width: '42px',
  height: '42px',
  '&:hover': {
    backgroundColor: 'rgba(0, 51, 153, 0.2)'
  }
}));

const SpeciesSection: React.FC = () => {
  const species = [
    {
      name: 'Neem (Azadirachta)',
      image: '/images/neem-tree.jpg'
    },
    {
      name: 'Neem (Azadirachta)',
      image: '/images/neem-tree.jpg'
    },
    {
      name: 'Neem (Azadirachta)',
      image: '/images/neem-tree.jpg'
    }
  ];

  return (
    <SpeciesContainer>
      <SectionHeader direction="row">
        <SectionTitle>Species</SectionTitle>
        <ViewAllButton>View All</ViewAllButton>
      </SectionHeader>

      <SpeciesGrid direction="row">
        {species.map((item, index) => (
          <SpeciesCard key={index}>
            <SpeciesImage
              image={item.image}
              title={item.name}
            />
            <SpeciesContent>
              <SpeciesName>{item.name}</SpeciesName>
              <KnowMoreButton
                endIcon={<ArrowRightIcon width={22} height={22} color="#003399" />}
              >
                Know More
              </KnowMoreButton>
            </SpeciesContent>
          </SpeciesCard>
        ))}
      </SpeciesGrid>

      <NavigationControls direction="row">
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
    </SpeciesContainer>
  );
};

export default SpeciesSection;