'use client';
import React from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowRightIcon from './icons/ArrowRightIcon';

const CaseStudiesContainer = styled(Box)({
  padding: '64px 32px'
});

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: '#232d26',
  fontFamily: '"Playfair Display", serif',
  textAlign: 'center',
  marginBottom: '40px'
}));

const CaseStudiesGrid = styled(Stack)({
  gap: '17px',
  marginBottom: '48px'
});

const CaseStudyCard = styled(Card)({
  width: '600px',
  borderRadius: '16px',
  border: '1px solid #e4e4e4',
  display: 'flex',
  flexDirection: 'row',
  overflow: 'hidden'
});

const CaseStudyImage = styled(Image)({
  objectFit: 'cover'
});

const CaseStudyContent = styled(CardContent)({
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
  flex: 1
});

const LocationInfo = styled(Stack)({
  gap: '8px'
});

const LocationTitle = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  color: '#333333'
}));

const LocationSubtitle = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: '#4b5563'
}));

const CaseStudyDescription = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#454950',
  flex: 1
}));

const ReadMoreButton = styled(Button)(({ theme }) => ({
  alignSelf: 'flex-start',
  color: theme.palette.primary.main,
  fontSize: '12px',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: '12px 16px',
  borderRadius: '8px',
  border: `2px solid ${theme.palette.primary.main}`,
  backgroundColor: 'transparent',
  '&:hover': {
    backgroundColor: 'rgba(0, 51, 153, 0.08)'
  }
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

const CaseStudiesSection: React.FC = () => {
  const caseStudies = [
    {
      title: 'Satna, CoNPCI',
      subtitle: 'Madhya Pradesh',
      description: 'Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor..',
      image: '/images/case-study-mountain.png'
    },
    {
      title: 'Satna, CoNPCI',
      subtitle: 'Madhya Pradesh',
      description: 'Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper lacinia. Eu dictum odio eu quam integer placerat posuere. Faucibus pellentesque sit in porttitor..',
      image: '/images/case-study-field.png'
    }
  ];

  return (
    <CaseStudiesContainer>
      <SectionTitle>Case Study</SectionTitle>
      
      <CaseStudiesGrid direction="row">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={index}>
            <CaseStudyImage 
              src={study.image} 
              alt={study.title}
              width={245}
              height={304}
            />
            
            <CaseStudyContent>
              <LocationInfo>
                <LocationTitle>{study.title}</LocationTitle>
                <LocationSubtitle>{study.subtitle}</LocationSubtitle>
              </LocationInfo>
              
              <CaseStudyDescription>
                {study.description}
              </CaseStudyDescription>
              
              <ReadMoreButton
                endIcon={<ArrowRightIcon width={22} height={22} color="#003399" />}
              >
                Read more
              </ReadMoreButton>
            </CaseStudyContent>
          </CaseStudyCard>
        ))}
      </CaseStudiesGrid>

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
    </CaseStudiesContainer>
  );
};

export default CaseStudiesSection;