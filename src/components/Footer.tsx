"use client";
import React from "react";
import { Box, Typography, Stack, Link, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const FooterContainer = styled(Box)({
  backgroundColor: "#0f172a",
  color: "#e6e6e6",
});

const FooterMain = styled(Stack)(({ theme }) => ({
  gap: "64px",
  padding: "64px 32px",
  alignItems: "flex-start",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    padding: "24px",
  },
}));

const FooterLogo = styled(Box)({
  width: "389px",
  display: "flex",
  flexDirection: "column",
  gap: "24px",
});

const LogoImage = styled(Image)({
  width: "64px",
  height: "auto",
});

const AppDownloadButtons = styled(Stack)({
  gap: "12px",
});

const FooterLinks = styled(Stack)(({ theme }) => ({
  gap: "200px",
  flex: 1,

  [theme.breakpoints.down("sm")]: {
    gap: "100px",
  },
}));

const LinkColumn = styled(Stack)({
  gap: "16px",
});

const ColumnTitle = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontSize: "18px",
  fontWeight: 500,
  color: "#e6e6e6",
  marginBottom: "8px",
});

const LinkList = styled(Stack)({
  gap: "8px",
});

const FooterLink = styled(Link)({
  fontFamily: "Poppins, sans-serif",
  fontSize: "14px",
  fontWeight: 400,
  lineHeight: "20px",
  color: "#e6e6e6",
  textDecoration: "none",
  cursor: "pointer",
  "&:hover": {
    color: "#ffffff",
    textDecoration: "underline",
  },
});

const SocialLink = styled(Stack)({
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  "&:hover": {
    "& .MuiTypography-root": {
      color: "#ffffff",
    },
  },
});

const SocialIcon = styled(IconButton)({
  color: "#e6e6e6",
  padding: "4px",
  "&:hover": {
    color: "#ffffff",
  },
});

const FooterBottom = styled(Stack)(({ theme }) => ({
  justifyContent: "center",
  gap: "80px",
  alignItems: "center",
  height: "72px",
  backgroundColor: "black",

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "16px",
    height: "95px",
  },
}));

const Copyright = styled(Typography)({
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#ffffff",
});

const LegalLinks = styled(Stack)({
  gap: "60px",
});

const LegalLink = styled(Link)({
  fontFamily: "Poppins, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  color: "#ffffff",
  textDecoration: "underline",
  cursor: "pointer",
  "&:hover": {
    opacity: 0.8,
  },
});

const Footer: React.FC = () => {
  const usefulLinks = [
    "Heartfulness Institute",
    "Kanha Shanti Vanam",
    "Daaji.org",
    "Heartfulness Magazine",
    "One Daily Thought",
    "Donate",
  ];

  const socialLinks = [
    { name: "Instagram", icon: <InstagramIcon /> },
    { name: "Facebook", icon: <FacebookIcon /> },
    { name: "LinkedIn", icon: <LinkedInIcon /> },
    { name: "Twitter", icon: <TwitterIcon /> },
  ];

  return (
    <FooterContainer>
      <Box maxWidth="1200px" mx="auto">
        <FooterMain direction="row">
          <FooterLogo>
            <LogoImage
              src="/images/logo2.png"
              alt="Forests by Heartfulness"
              width={120}
              height={40}
            />
            <AppDownloadButtons direction="row">
              <Image
                src="/images/google-play.png"
                alt="Get it on Google Play"
                width={150}
                height={45}
                style={{ cursor: "pointer" }}
              />
              <Image
                src="/images/app-store.png"
                alt="Get it on Google Play"
                width={150}
                height={45}
                style={{ cursor: "pointer" }}
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
                    <SocialIcon size="small">{social.icon}</SocialIcon>
                    <FooterLink>{social.name}</FooterLink>
                  </SocialLink>
                ))}
              </LinkList>
            </LinkColumn>
          </FooterLinks>
        </FooterMain>
      </Box>

      <FooterBottom direction="row">
        <Copyright>© 2025 Heartfulness - All rights reserved</Copyright>
        <LegalLinks direction="row">
          <LegalLink>Terms</LegalLink>
          <LegalLink>Privacy</LegalLink>
        </LegalLinks>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
