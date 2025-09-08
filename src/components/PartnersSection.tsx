"use client";
import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";

const PartnersContainer = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff",
  padding: "64px 32px",
  borderRadius: "16px",
  border: "1px solid #e4e4e4",
  boxShadow: "0px 12px 24px rgba(133, 133, 133, 0.12)",
  margin: "0 32px",
  textAlign: "center",

  [theme.breakpoints.down("sm")]: {
    margin: "0 16px",
    padding: "32px 16px",
  },
}));

const PartnersTitle = styled(Typography)(({ theme }) => ({
  fontSize: "32px",
  fontWeight: 600,
  color: theme.palette.text.primary,
  fontFamily: '"Playfair Display", serif',
  marginBottom: "32px",

  [theme.breakpoints.down("sm")]: {
    fontSize: "22px",
  },
}));

const PartnersGrid = styled(Stack)(({ theme }) => ({
  alignItems: "center",
  justifyContent: "center",

  [theme.breakpoints.down("sm")]: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    justifyContent: "center",
  },
}));

const PartnerLogo = styled(Image)(({ theme }) => ({
  maxHeight: "120px",
  maxWidth: "226px",
  objectFit: "contain",

  [theme.breakpoints.down("sm")]: {
    maxWidth: "140px",
    maxHeight: "80px",
  },
}));

const PartnersSection: React.FC = () => {
  const partners = [
    { name: "first", logo: "/images/partners/first.png" },
    { name: "Accenture", logo: "/images/partners/accenture.png" },
    { name: "Google", logo: "/images/partners/google.png" },
    { name: "Bank of America", logo: "/images/partners/america.png" },
    { name: "WWF", logo: "/images/partners/wwf.png" },
    { name: "Zscaler", logo: "/images/partners/zscaler.png" },
  ];

  return (
    <PartnersContainer>
      <PartnersTitle>Our Supporting Partners</PartnersTitle>

      <PartnersGrid direction="row">
        {partners.map((partner, index) => (
          <PartnerLogo
            key={index}
            src={partner.logo}
            alt={partner.name}
            width={200}
            height={60}
          />
        ))}
      </PartnersGrid>
    </PartnersContainer>
  );
};

export default PartnersSection;
