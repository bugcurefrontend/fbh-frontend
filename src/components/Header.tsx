'use client';
import React from 'react';
import { AppBar, Toolbar, Box, Button, Stack, Avatar, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LanguageIcon from '@mui/icons-material/Language';
import Image from 'next/image';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0px 1px 2px rgba(0, 0, 0, 0.05)',
  color: theme.palette.text.primary
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  padding: '8px 12px',
  '&:hover': {
    backgroundColor: 'rgba(0, 51, 153, 0.08)'
  }
}));

const Header: React.FC = () => {
  return (
    <StyledAppBar position="fixed">
      <Toolbar sx={{ justifyContent: 'space-between', px: 4 }}>
        <Image src="/images/logo.svg" alt="Forests by Heartfulness" width={57} height={46} priority />
        
        <Stack direction="row" spacing={2} alignItems="center">
          <NavButton endIcon={<ExpandMoreIcon />}>About</NavButton>
          <NavButton endIcon={<ExpandMoreIcon />}>How it works</NavButton>
          <NavButton endIcon={<ExpandMoreIcon />}>Projects</NavButton>
          <NavButton endIcon={<ExpandMoreIcon />}>Species</NavButton>
          <NavButton endIcon={<ExpandMoreIcon />}>Get involved</NavButton>
          <NavButton endIcon={<ExpandMoreIcon />}>Plant for a cause</NavButton>
          <NavButton>Contact us</NavButton>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <IconButton size="small">
            <LanguageIcon />
          </IconButton>
          <Avatar sx={{ width: 32, height: 32 }} src="/images/avatar.jpg" />
        </Stack>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;