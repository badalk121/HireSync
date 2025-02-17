import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Button,
  Typography,
  Grid,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import {
  ApplicationsTable,
  ApplicationFilters,
  NewApplicationModal,
} from '../../components/applications';
import { fetchApplications } from '../../store/slices/applicationsSlice';

const Applications = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
  });

  const dispatch = useDispatch();
  const { applications, loading } = useSelector(state => state.applications);

  useEffect(() => {
    dispatch(fetchApplications(filters));
  }, [dispatch, filters]);

  return (
    <Box>
      <Grid container spacing={2} alignItems="center" mb={3}>
        <Grid item xs>
          <Typography variant="h5">Applications</Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsModalOpen(true)}
          >
            New Application
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ mb: 3 }}>
        <ApplicationFilters
          filters={filters}
          onFilterChange={setFilters}
        />
      </Paper>

      <ApplicationsTable
        applications={applications}
        loading={loading}
      />

      <NewApplicationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </Box>
  );
};