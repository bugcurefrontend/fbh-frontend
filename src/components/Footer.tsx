'use client';
import React from 'react';
import { Box, Typography, Stack, Link, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';

const FooterContainer = styled(Box)({
  backgroundColor: '#0f172a',
  color: '#e6e6e6',
  padding: '64px 32px 32px'
});

const FooterContent = styled(Stack)({
  gap: '48px'
});

const FooterMain = styled(Stack)({
  gap: '64px',
  alignItems: 'flex-start'
});

const FooterLogo = styled(Box)({
  width: '389px',
  display: 'flex',
  flexDirection: 'column',
  gap: '24px'
});

const LogoImage = styled(Image)({
  width: '120px',
  height: 'auto'
});

const AppDownloadButtons = styled(Stack)({
  gap: '12px'
});

const AppButton = styled('img')({
  height: '40px',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
});

const FooterLinks = styled(Stack)({
  gap: '64px',
  flex: 1
});

const LinkColumn = styled(Stack)({
  gap: '16px'
});

const ColumnTitle = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '18px',
  fontWeight: 500,
  color: '#e6e6e6',
  marginBottom: '8px'
});

const LinkList = styled(Stack)({
  gap: '8px'
});

const FooterLink = styled(Link)({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '14px',
  fontWeight: 400,
  lineHeight: '20px',
  color: '#e6e6e6',
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: '#ffffff',
    textDecoration: 'underline'
  }
});

const SocialLink = styled(Stack)({
  alignItems: 'center',
  gap: '8px',
  cursor: 'pointer',
  '&:hover': {
    '& .MuiTypography-root': {
      color: '#ffffff'
    }
  }
});

const SocialIcon = styled(IconButton)({
  color: '#e6e6e6',
  padding: '4px',
  '&:hover': {
    color: '#ffffff'
  }
});

const FooterBottom = styled(Stack)({
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '32px',
  borderTop: '1px solid #374151'
});

const Copyright = styled(Typography)({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#ffffff'
});

const LegalLinks = styled(Stack)({
  gap: '12px'
});

const LegalLink = styled(Link)({
  fontFamily: 'Poppins, sans-serif',
  fontSize: '16px',
  fontWeight: 500,
  color: '#ffffff',
  textDecoration: 'underline',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8
  }
});

const Footer: React.FC = () => {
  const usefulLinks = [
    'Heartfulness Institute',
    'Kanha Shanti Vanam',
    'Daaji.org',
    'Heartfulness Magazine',
    'One Daily Thought',
    'Donate'
  ];

  const socialLinks = [
    { name: 'Instagram', icon: <InstagramIcon /> },
    { name: 'Facebook', icon: <FacebookIcon /> },
    { name: 'LinkedIn', icon: <LinkedInIcon /> },
    { name: 'Twitter', icon: <TwitterIcon /> }
  ];

  return (
    <FooterContainer>
      <FooterContent>
        <FooterMain direction="row">
          <FooterLogo>
            <LogoImage 
              src="/images/logo-white.svg" 
              alt="Forests by Heartfulness"
              width={120}
              height={40}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://via.placeholder.com/120x60/0f172a/e6e6e6?text=FBH";
              }}
            />
            <AppDownloadButtons direction="row">
              <AppButton 
                src="https://via.placeholder.com/120x40/000000/ffffff?text=Google+Play"
                alt="Get it on Google Play"
              />
              <AppButton 
                src="https://via.placeholder.com/120x40/000000/ffffff?text=App+Store"
                alt="Download on the App Store"
              />
            </AppDownloadButtons>
          </FooterLogo>

          <FooterLinks direction="row">
            <LinkColumn>
              <ColumnTitle>Useful Links</ColumnTitle>
              <LinkList>
                {usefulLinks.map((link, index) => (
                  <FooterLink key={index}>{link}</FooterLink>
                ))}
              </LinkList>
            </LinkColumn>

            <LinkColumn>
              <ColumnTitle>Social</ColumnTitle>
              <LinkList>
                {socialLinks.map((social, index) => (
                  <SocialLink key={index} direction="row">
                    <SocialIcon size="small">
                      {social.icon}
                    </SocialIcon>
                    <FooterLink>{social.name}</FooterLink>
                  </SocialLink>
                ))}
              </LinkList>
            </LinkColumn>
          </FooterLinks>
        </FooterMain>

        <FooterBottom direction="row">
          <Copyright>© 2025 Heartfulness - All rights reserved</Copyright>
          <LegalLinks direction="row">
            <LegalLink>Terms</LegalLink>
            <LegalLink>Privacy</LegalLink>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;