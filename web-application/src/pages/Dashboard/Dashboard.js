import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplicationStats,
  RecentApplications,
  UpcomingInterviews,
  ActivityTimeline,
} from '../../components/dashboard';
import { fetchDashboardData } from '../../store/slices/dashboardSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <ApplicationStats stats={data.stats} />
      </Grid>
      <Grid item xs={12} md={8}>
        <RecentApplications applications={data.recentApplications} />
      </Grid>
      <Grid item xs={12} md={4}>
        <UpcomingInterviews interviews={data.upcomingInterviews} />
      </Grid>
      <Grid item xs={12}>
        <ActivityTimeline activities={data.activities} />
      </Grid>
    </Grid>
  );
};

export default Dashboard;