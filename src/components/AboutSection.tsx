'use client';
import React from 'react';
import { Box, Typography, Button, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import ArrowRightIcon from './icons/ArrowRightIcon';

const AboutContainer = styled(Stack)({
  gap: '32px',
  padding: '64px 32px',
  alignItems: 'center'
});

const AboutImage = styled(Image)({
  borderRadius: '16px',
  objectFit: 'cover'
});

const AboutContent = styled(Stack)({
  gap: '24px',
  flex: 1,
  maxWidth: '556px'
});

const AboutTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontFamily: '"Playfair Display", serif'
}));

const AboutDescription = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  lineHeight: '24px',
  color: theme.palette.text.primary
}));

const KnowMoreButton = styled(Button)(({ theme }) => ({
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
        <AboutTitle>
          What is Forests By Heartfulness?
        </AboutTitle>
        
        <AboutDescription>
          Forests By Heartfulness is rejuvenating Earth's native, endangered, and 
          endemic species through green action, cutting-edge research, ecological 
          empathy and a reconnection between humans and nature.
        </AboutDescription>
        
        <KnowMoreButton 
          variant="outlined"
          endIcon={<ArrowRightIcon width={22} height={22} color="#003399" />}
        >
          Know More
        </KnowMoreButton>
      </AboutContent>
    </AboutContainer>
  );
};

export default AboutSection;