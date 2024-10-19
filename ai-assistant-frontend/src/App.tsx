// src/App.tsx

import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface';
import TaskManager from './components/TaskManager';
import Home from './components/Home';
import RemindersCheck from './components/RemindersCheck';
import Auth from './components/Auth';
import { TaskProvider } from './contexts/TaskContext';
import { Container, Typography, Tabs, Tab, Box, CircularProgress } from '@mui/material';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

const App: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, loading] = useAuthState(auth);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Typography variant="h4" component="h1" align="center" sx={{ margin: '20px 0' }}>
          AI Personal Assistant
        </Typography>
        <Auth />
      </Container>
    );
  }

  return (
    <TaskProvider>
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" align="center" sx={{ margin: '20px 0' }}>
          AI Personal Assistant
        </Typography>
        <Auth />
        <RemindersCheck />
        <Tabs value={tabValue} onChange={handleTabChange} centered sx={{ mb: 2 }}>
          <Tab label="Home" />
          <Tab label="Chat" />
          <Tab label="Tasks" />
        </Tabs>
        <Box sx={{ padding: 2 }}>
          {tabValue === 0 && <Home />}
          {tabValue === 1 && <ChatInterface />}
          {tabValue === 2 && <TaskManager />}
        </Box>
      </Container>
    </TaskProvider>
  );
};

export default App;