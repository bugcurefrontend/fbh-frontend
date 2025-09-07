'use client';
import React from 'react';
import { Box, Typography, Button, Stack, Card, CardContent, CardMedia, Chip } from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationPinIcon from './icons/LocationPinIcon';

const ProjectsContainer = styled(Box)({
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

const ProjectsGrid = styled(Box)({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '32px'
});

const ProjectCard = styled(Card)({
  borderRadius: '16px',
  boxShadow: '0px 1px 2px rgba(133, 133, 133, 0.30)',
  overflow: 'hidden'
});

const ProjectImageContainer = styled(Box)({
  position: 'relative',
  height: '200px'
});

const ProjectImage = styled(CardMedia)({
  height: '100%',
  position: 'relative'
});

const ProjectBadges = styled(Stack)({
  position: 'absolute',
  top: '16px',
  left: '16px',
  gap: '8px'
});

const ProjectBadge = styled(Chip)({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: '#333',
  fontSize: '12px',
  fontWeight: 600,
  height: '24px'
});

const ProjectContent = styled(CardContent)({
  padding: '24px'
});

const ProjectInfo = styled(Stack)({
  gap: '16px',
  marginBottom: '24px'
});

const ProjectName = styled(Typography)(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 700,
  color: theme.palette.text.primary
}));

const ProjectLocation = styled(Stack)({
  alignItems: 'center',
  gap: '8px'
});

const LocationText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 600,
  color: theme.palette.text.primary
}));

const DonateButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 700,
  padding: '12px 24px',
  borderRadius: '8px',
  width: '100%',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark
  }
}));

const ProjectsSection: React.FC = () => {
  const projects = [
    {
      name: 'K & S Associate',
      location: 'Indore',
      image: '/images/forest-project-1.jpg',
      badges: ['100+ planted', 'Reforestation']
    },
    {
      name: 'K & S Associate',
      location: 'Indore',
      image: '/images/forest-project-2.jpg',
      badges: ['100+ planted', 'Reforestation']
    },
    {
      name: 'K & S Associate',
      location: 'Indore',
      image: '/images/forest-project-3.jpg',
      badges: ['100+ planted', 'Reforestation']
    },
    {
      name: 'K & S Associate',
      location: 'Indore',
      image: '/images/forest-project-4.jpg',
      badges: ['100+ planted', 'Reforestation']
    },
    {
      name: 'K & S Associate',
      location: 'Indore',
      image: '/images/forest-project-5.jpg',
      badges: ['100+ planted', 'Reforestation']
    },
    {
      name: 'K & S Associate',
      location: 'Indore',
      image: '/images/forest-project-6.jpg',
      badges: ['100+ planted', 'Reforestation']
    }
  ];

  return (
    <ProjectsContainer>
      <SectionHeader direction="row">
        <SectionTitle>Projects</SectionTitle>
        <ViewAllButton>View All</ViewAllButton>
      </SectionHeader>

      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard key={index}>
            <ProjectImageContainer>
              <ProjectImage
                image={`https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=200&fit=crop&crop=forest`}
                title={project.name}
              />
              <ProjectBadges direction="row">
                {project.badges.map((badge, badgeIndex) => (
                  <ProjectBadge key={badgeIndex} label={badge} size="small" />
                ))}
              </ProjectBadges>
            </ProjectImageContainer>
            
            <ProjectContent>
              <ProjectInfo>
                <ProjectName>{project.name}</ProjectName>
                <ProjectLocation direction="row">
                  <LocationPinIcon width={13} height={16} color="#19212c" />
                  <LocationText>{project.location}</LocationText>
                </ProjectLocation>
              </ProjectInfo>
              
              <DonateButton variant="contained">
                DONATE
              </DonateButton>
            </ProjectContent>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
};

export default ProjectsSection;