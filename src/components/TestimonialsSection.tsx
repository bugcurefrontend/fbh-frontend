'use client';
import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import QuoteIcon from './icons/QuoteIcon';

const TestimonialsContainer = styled(Box)({
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

const TestimonialCard = styled(Stack)({
  gap: '61px',
  alignItems: 'center'
});

const TestimonialImage = styled(Image)({
  borderRadius: '8px',
  objectFit: 'cover'
});

const TestimonialContent = styled(Stack)({
  gap: '40px',
  flex: 1,
  maxWidth: '630px'
});

const QuoteIconContainer = styled(Box)({
  width: '77px',
  height: '77px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
});

const TestimonialText = styled(Stack)({
  gap: '16px'
});

const Attribution = styled(Stack)({
  gap: '8px'
});

const Source = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 600,
  color: '#333333'
}));

const Author = styled(Typography)(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 700,
  color: '#4b5563'
}));

const Quote = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 400,
  lineHeight: '24px',
  color: '#454950'
}));

const PaginationDots = styled(Stack)({
  gap: '12px',
  justifyContent: 'center',
  marginTop: '40px'
});

const PaginationDot = styled(Box)<{ active?: boolean }>(({ active, theme }) => ({
  width: '40px',
  height: '8px',
  borderRadius: '4px',
  backgroundColor: active ? theme.palette.primary.main : '#e6ebf5'
}));

const TestimonialsSection: React.FC = () => {
  return (
    <TestimonialsContainer>
      <SectionTitle>Testimonials</SectionTitle>
      
      <TestimonialCard direction="row">
        <TestimonialImage 
          src="/images/volunteer-testimonial.png" 
          alt="Volunteer testimonial"
          width={493}
          height={423}
        />
        
        <TestimonialContent>
          <QuoteIconContainer>
            <QuoteIcon width={77} height={77} color="#003399" />
          </QuoteIconContainer>
          
          <TestimonialText>
            <Attribution>
              <Source>TIMES OF INDIA</Source>
              <Author>Akshay Shinde</Author>
            </Attribution>
            
            <Quote>
              Lorem ipsum dolor sit amet consectetur. Nibh porta dui fermentum in facilisi sed. 
              Pellentesque lectus proin gravida in. Malesuada etiam viverra ut auctor semper 
              lacinia. Eu dictum odio eu quam integer placerat posuere.
            </Quote>
          </TestimonialText>
        </TestimonialContent>
      </TestimonialCard>
      
      <PaginationDots direction="row">
        <PaginationDot active />
        <PaginationDot />
        <PaginationDot />
      </PaginationDots>
    </TestimonialsContainer>
  );
};

export default TestimonialsSection;