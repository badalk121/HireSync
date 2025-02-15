import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './theme';
import {
  Box,
  Button,
  Typography,
  CircularProgress
} from './components';

const Popup = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [todayApplications, setTodayApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
    fetchTodayApplications();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = await chrome.storage.local.get('authToken');
      setIsLoggedIn(!!token.authToken);
    } catch (error) {
      console.error('Auth check failed:', error);
    }
    setLoading(false);
  };

  const fetchTodayApplications = async () => {
    try {
      const token = await chrome.storage.local.get('authToken');
      const response = await fetch('https://api.hiresync.com/applications/today', {
        headers: {
          'Authorization': `Bearer ${token.authToken}`
        }
      });
      const data = await response.json();
      setTodayApplications(data.count);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography variant="h6">HireSync</Typography>
      {isLoggedIn ? (
        <>
          <Typography variant="body1">
            Applications today: {todayApplications}
          </Typography>
          <Button
            variant="contained"
            onClick={() => chrome.tabs.create({ url: 'https://app.hiresync.com' })}
            fullWidth
            sx={{ mt: 2 }}
          >
            Open Dashboard
          </Button>
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => chrome.tabs.create({ url: 'https://app.hiresync.com/login' })}
          fullWidth
        >
          Login to HireSync
        </Button>
      )}
    </Box>
  );
};

const root = createRoot(document.getElementById('popup-root'));
root.render(
  <ThemeProvider>
    <Popup />
  </ThemeProvider>
);