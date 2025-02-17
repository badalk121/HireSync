import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

export const ApplicationsTable = ({ applications, onEdit, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Company</TableCell>
            <TableCell>Position</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Applied Date</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applications.map((application) => (
            <TableRow key={application.id}>
              <TableCell>{application.company}</TableCell>
              <TableCell>{application.position}</TableCell>
              <TableCell>
                <Chip
                  label={application.status}
                  color={getStatusColor(application.status)}
                />
              </TableCell>
              <TableCell>
                {format(new Date(application.appliedDate), 'MMM dd, yyyy')}
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onEdit(application)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(application.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};