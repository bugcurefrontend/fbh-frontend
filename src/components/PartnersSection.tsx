'use client';
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';

const PartnersContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#ffffff',
  padding: '64px 32px',
  borderRadius: '16px',
  border: '1px solid #e4e4e4',
  boxShadow: '0px 12px 24px rgba(133, 133, 133, 0.12)',
  margin: '0 32px',
  textAlign: 'center'
}));

const PartnersTitle = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontFamily: '"Playfair Display", serif',
  marginBottom: '32px'
}));

const PartnersGrid = styled(Stack)({
  justifyContent: 'space-around',
  alignItems: 'center',
  gap: '48px',
  flexWrap: 'wrap'
});

const PartnerLogo = styled(Image)({
  height: '60px',
  maxWidth: '200px',
  objectFit: 'contain',
  filter: 'grayscale(100%)',
  opacity: 0.7,
  transition: 'all 0.3s ease',
  '&:hover': {
    filter: 'grayscale(0%)',
    opacity: 1
  }
});

const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'Accenture', logo: '/images/partners/accenture.png' },
    { name: 'Google', logo: '/images/partners/google.png' },
    { name: 'Bank of America', logo: '/images/partners/bank-of-america.png' },
    { name: 'WWF', logo: '/images/partners/wwf.png' },
    { name: 'Zscaler', logo: '/images/partners/zscaler.png' }
  ];

  return (
    <PartnersContainer>
      <PartnersTitle>
        Our Supporting Partners
      </PartnersTitle>
      
      <PartnersGrid direction="row">
        {partners.map((partner, index) => (
          <PartnerLogo
            key={index}
            src={partner.logo}
            alt={partner.name}
            width={200}
            height={60}
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.src = `https://via.placeholder.com/200x60/f0f0f0/666666?text=${partner.name}`;
            }}
          />
        ))}
      </PartnersGrid>
    </PartnersContainer>
  );
};

export default PartnersSection;