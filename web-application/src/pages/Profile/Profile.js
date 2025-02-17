import React, { useState } from 'react';
import {
  Box,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
  Tabs,
  Tab,
} from '@mui/material';
import {
  PersonalInfo,
  Experience,
  Education,
  Skills,
  Documents,
} from '../../components/profile';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../store/slices/profileSlice';

const Profile = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.data);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>
            <Avatar
              src={profile.avatar}
              sx={{ width: 100, height: 100 }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h5">{profile.name}</Typography>
            <Typography color="textSecondary">{profile.email}</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained">Edit Profile</Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Personal Info" />
          <Tab label="Experience" />
          <Tab label="Education" />
          <Tab label="Skills" />
          <Tab label="Documents" />
        </Tabs>

        <Box sx={{ p: 3 }}>
          {activeTab === 0 && <PersonalInfo data={profile} />}
          {activeTab === 1 && <Experience data={profile.experience} />}
          {activeTab === 2 && <Education data={profile.education} />}
          {activeTab === 3 && <Skills data={profile.skills} />}
          {activeTab === 4 && <Documents data={profile.documents} />}
        </Box>
      </Paper>
    </Box>
  );
};