import React, { useState, useEffect } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  ApplicationTrends,
  StatusDistribution,
  ResponseRates,
  TimeToOffer,
} from '../../components/analytics';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnalyticsData } from '../../store/slices/analyticsSlice';

const Analytics = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector(state => state.analytics);

  useEffect(() => {
    dispatch(fetchAnalyticsData());
  }, [dispatch]);

  return (
    <Box>
      <Typography variant="h5" mb={3}>Analytics</Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ApplicationTrends data={data.applicationTrends} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <StatusDistribution data={data.statusDistribution} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <ResponseRates data={data.responseRates} />
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <TimeToOffer data={data.timeToOffer} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};