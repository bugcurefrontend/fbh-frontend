"use client";
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Stack,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Image from "next/image";
import { Logout } from "@mui/icons-material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
  color: theme.palette.text.primary,
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: "12px",
  fontWeight: 700,
  lineHeight: "18px",
  textTransform: "uppercase",
  padding: "8px",
  borderRadius: "0px",
  "&:hover, &[aria-expanded='true']": {
    background: "#E6EBF5",
    color: "black",
    boxShadow: "none",
  },
}));

const MobileMenuButton = styled(ListItemButton)(({ theme }) => ({
  padding: "12px 20px",
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));

const MobileSubMenuItem = styled(ListItemButton)(({ theme }) => ({
  paddingLeft: "40px",
  paddingTop: "8px",
  paddingBottom: "8px",
  fontSize: "14px",
  color: theme.palette.text.secondary,
  "&:hover": {
    backgroundColor: "#f5f5f5",
  },
}));

const Header: React.FC = () => {
  const [dropdownAnchor, setDropdownAnchor] =
    React.useState<null | HTMLElement>(null);
  const [openDropdown, setOpenDropdown] = React.useState<string | null>(null);
  const [profileAnchor, setProfileAnchor] = React.useState<null | HTMLElement>(
    null
  );
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [mobileExpandedMenu, setMobileExpandedMenu] = React.useState<
    string | null
  >(null);

  const hoverTimeout = React.useRef<NodeJS.Timeout | null>(null);

  const handleDropdownOpen =
    (menu: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
      if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
      setDropdownAnchor(event.currentTarget);
      setOpenDropdown(menu);
    };

  const handleDropdownClose = () => {
    hoverTimeout.current = setTimeout(() => {
      setDropdownAnchor(null);
      setOpenDropdown(null);
    }, 200); // small delay for smooth cursor movement
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuExpand = (menu: string) => {
    setMobileExpandedMenu(mobileExpandedMenu === menu ? null : menu);
  };

  // Dropdown content
  const dropdownContent: Record<string, React.ReactNode> = {
    about: (
      <Stack spacing={1} sx={{ px: 2, py: 1 }}>
        <MenuItem>Our Mission & Vision</MenuItem>
        <MenuItem>Meet The Team</MenuItem>
        <MenuItem>FAQs</MenuItem>
      </Stack>
    ),
    how: (
      <Stack spacing={1} sx={{ px: 2, py: 1 }}>
        <MenuItem>Process</MenuItem>
        <MenuItem>Keystone Projects</MenuItem>
        <MenuItem>Projects Archetypes</MenuItem>
      </Stack>
    ),
    projects: (
      <Stack spacing={1} sx={{ px: 2, py: 1 }}>
        <MenuItem>All Projects</MenuItem>
        <MenuItem>Featured</MenuItem>
        <MenuItem>Completed</MenuItem>
      </Stack>
    ),
    species: (
      <Stack spacing={1} sx={{ px: 2, py: 1 }}>
        <MenuItem>Tree Species</MenuItem>
        <MenuItem>Plant Database</MenuItem>
      </Stack>
    ),
    involved: (
      <Stack spacing={1} sx={{ px: 2, py: 1 }}>
        <MenuItem>Volunteer</MenuItem>
        <MenuItem>Partner With Us</MenuItem>
        <MenuItem>Events</MenuItem>
      </Stack>
    ),
    cause: (
      <Stack spacing={1} sx={{ px: 2, py: 1 }}>
        <MenuItem>Donate</MenuItem>
        <MenuItem>Corporate Gifting</MenuItem>
      </Stack>
    ),
  };

  // Mobile menu content
  const mobileMenuContent: Record<string, string[]> = {
    about: ["Our Mission & Vision", "Meet The Team", "FAQs"],
    how: ["Process", "Keystone Projects", "Project Archetypes"],
    projects: ["All Projects", "Featured", "Completed"],
    species: ["Tree Species", "Plant Database"],
    involved: ["Volunteer", "Partner With Us", "Events"],
    cause: ["Donate", "Corporate Gifting"],
  };

  const navigationItems = [
    { label: "About", key: "about" },
    { label: "How it works", key: "how" },
    { label: "Projects", key: "projects" },
    { label: "Species", key: "species" },
    { label: "Get involved", key: "involved" },
    { label: "Plant for a cause", key: "cause" },
  ];

  return (
    <>
      <StyledAppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
          {/* Logo */}
          <Image
            src="/images/logo.png"
            alt="Forests by Heartfulness"
            width={57}
            height={46}
            priority
          />

          {/* Mobile Menu Icon */}
          <Box display={{ xs: "block", sm: "none" }}>
            <IconButton onClick={handleMobileMenuToggle}>
              <MenuIcon />
            </IconButton>
          </Box>

          {/* Navigation Links - Desktop Only */}
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            display={{ xs: "none", sm: "flex" }}
          >
            {navigationItems.map((item) => (
              <NavButton
                key={item.key}
                endIcon={<ExpandMoreIcon />}
                onMouseEnter={handleDropdownOpen(item.key)}
                aria-controls={
                  openDropdown === item.key ? `${item.key}-menu` : undefined
                }
                aria-haspopup="true"
                aria-expanded={openDropdown === item.key ? "true" : undefined}
              >
                {item.label}
              </NavButton>
            ))}
            <NavButton>Contact us</NavButton>
          </Stack>

          {/* Desktop Dropdown */}
          <Menu
            id="nav-dropdown-menu"
            anchorEl={dropdownAnchor}
            open={Boolean(openDropdown)}
            onClose={handleDropdownClose}
            MenuListProps={{
              onMouseEnter: () => {
                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
              },
              onMouseLeave: handleDropdownClose,
              sx: {
                p: 0,
                pt: 2, // 16px
                pb: 1, // 8px
                borderRadius: 0,
                gap: "16px",
              },
            }}
            PaperProps={{
              sx: {
                borderRadius: 0,
                mt: 1,
              },
              onMouseEnter: () => {
                if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
              },
              onMouseLeave: handleDropdownClose,
            }}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            {openDropdown && dropdownContent[openDropdown]}
          </Menu>

          {/* Right side icons - Desktop Only */}
          <Stack
            direction="row"
            spacing={1.5}
            alignItems="center"
            display={{ xs: "none", sm: "flex" }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 0.5,
                border: "1px solid #ccc",
                borderRadius: "4px",
                px: 1,
                py: 0.5,
                cursor: "pointer",
                "&:hover": {
                  borderColor: "primary.main",
                },
              }}
            >
              <Image
                src="/images/flag.png"
                alt="flag"
                width={24}
                height={24}
                priority
              />
              <ExpandMoreIcon fontSize="small" />
            </Box>

            <Image
              src="/images/profile.png"
              alt="avatar"
              width={32}
              height={32}
              priority
              style={{ cursor: "pointer", borderRadius: "50%" }}
              onClick={handleProfileClick}
            />
            <Menu
              anchorEl={profileAnchor}
              open={Boolean(profileAnchor)}
              onClose={handleProfileClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{ sx: { mt: 1.5 } }}
            >
              <Stack
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ px: 2, py: 1 }}
              >
                <Image
                  src="/images/profile.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                <Box>
                  <Box fontWeight={700}>John Doe</Box>
                  <Box fontSize={13} color="text.secondary">
                    xyz@gmail.com
                  </Box>
                </Box>
              </Stack>
              <MenuItem onClick={handleProfileClose}>Dashboard</MenuItem>
              <MenuItem onClick={handleProfileClose}>My Trees</MenuItem>
              <MenuItem
                onClick={handleProfileClose}
                sx={{
                  color: "error.main",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Sign Out&nbsp;
                <Logout fontSize="small" />
              </MenuItem>
            </Menu>
          </Stack>
        </Toolbar>
      </StyledAppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuToggle}
        PaperProps={{
          sx: {
            width: "100%",
          },
        }}
      >
        <Box sx={{ width: "100%", height: "100%" }}>
          {/* Header with close button */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              p: 2,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Forests by Heartfulness"
              width={40}
              height={32}
              priority
            />
            <IconButton onClick={handleMobileMenuToggle}>
              <CloseIcon />
            </IconButton>
          </Box>

          <List sx={{ pt: 0 }}>
            {/* Navigation Items */}
            {navigationItems.map((item) => (
              <React.Fragment key={item.key}>
                <MobileMenuButton
                  onClick={() => handleMobileMenuExpand(item.key)}
                >
                  <ListItemText primary={item.label} />
                  {mobileExpandedMenu === item.key ? (
                    <ExpandLessIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </MobileMenuButton>
                <Collapse
                  in={mobileExpandedMenu === item.key}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {mobileMenuContent[item.key].map((subItem) => (
                      <MobileSubMenuItem key={subItem}>
                        <ListItemText primary={subItem} />
                      </MobileSubMenuItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            ))}

            {/* Contact Us */}
            <MobileMenuButton>
              <ListItemText primary="Contact us" />
            </MobileMenuButton>

            <Divider sx={{ my: 1 }} />

            {/* User Profile Section */}
            <Box sx={{ px: 2, py: 2 }}>
              <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Image
                  src="/images/profile.png"
                  alt="avatar"
                  width={40}
                  height={40}
                  style={{ borderRadius: "50%" }}
                />
                <Box>
                  <Box fontWeight={600} fontSize={14}>
                    John Doe
                  </Box>
                  <Box fontSize={12} color="text.secondary">
                    xyz@gmail.com
                  </Box>
                </Box>
              </Stack>
            </Box>

            {/* Dashboard and My Trees */}
            <MobileMenuButton>
              <ListItemText primary="Dashboard" />
            </MobileMenuButton>
            <MobileMenuButton>
              <ListItemText primary="My Trees" />
            </MobileMenuButton>

            <Divider sx={{ my: 1 }} />

            {/* Sign Out */}
            <MobileMenuButton sx={{ color: "error.main" }}>
              <ListItemText primary="Sign Out" />
              <Logout fontSize="small" />
            </MobileMenuButton>

            {/* Country/Language Selector */}
            <Box
              sx={{
                p: 2,
                mt: "auto",
                mx: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Box
                sx={{
                  width: "70px",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                  px: 2,
                  py: 1,
                  cursor: "pointer",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
              >
                <Image
                  src="/images/flag.png"
                  alt="flag"
                  width={20}
                  height={20}
                  priority
                />
                <ExpandMoreIcon fontSize="small" />
              </Box>
            </Box>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
