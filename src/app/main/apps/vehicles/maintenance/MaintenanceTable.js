import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import { parseISO, format } from 'date-fns';
import { BASE_URL } from '../store/vehicelDetailSlice';
import AlertMessage from '../AlertMessage';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'lightGray',
    color: theme.palette.common.black
  },
  body: {
    fontSize: 10
  }
}))(TableCell);

const useStyles = makeStyles({
  table: {
    minWidth: 700
  }
});

const apiCall = async (method, endPoint) => {
  let config = {
    method: method,
    maxBodyLength: Infinity,
    url: `${BASE_URL}/vehicles${endPoint}`,
    headers: {
      Authorization: process.env.REACT_APP_API_TOKEN
    }
  };
  try {
    return await axios.request(config);
  } catch (error) {
    return error;
  }
};

export default function MaintenanceTable({ tableDatas }) {
  const classes = useStyles();
  let [message, setMessage] = useState('');
  let [tableLocal, setTableLocal] = useState(tableDatas);

  const onComplete = async (vehicle_id, id) => {
    try {
      if (!tableLocal.find(item => item.id === id).completed) {
        await apiCall('patch', `/${vehicle_id}/issues/${id}/complete`);
        setMessage('successfully copleted maintenance');
        window.location.reload();
      } else {
        setMessage('Has been successfully complete');
      }
    } catch (error) {
      setMessage('Failed to complete');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  const onDelete = async (vehicle_id, id) => {
    try {
      await apiCall('delete', `/${vehicle_id}/issues/${id}`);
      setMessage('successfully deleted');
      setTableLocal(prev => prev.filter(item => item.id !== id));
    } catch (error) {
      setMessage('Failed to delete');
    }
    setTimeout(() => setMessage(''), 2000);
  };

  return (
    <TableContainer component={Paper}>
      {message && <AlertMessage message={message} />}
      {tableLocal?.length ? (
        <Table className={classes.table} stickyHeader aria-label="table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell align="left">Priority</StyledTableCell>
              <StyledTableCell align="left">Due date</StyledTableCell>
              <StyledTableCell align="left">Completed</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableLocal?.map(row => (
              <TableRow key={row.created_at}>
                <StyledTableCell component="th" scope="row">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="left">{row.priority}</StyledTableCell>
                <StyledTableCell align="left">{format(parseISO(row.due_date), 'MMM dd, yyyy')}</StyledTableCell>
                <StyledTableCell align="center" padding="checkbox">
                  <Checkbox checked={row.completed} onClick={() => onComplete(row.vehicle_id, row.id)} />
                  <IconButton
                    style={{ fontSize: '12px', color: 'black' }}
                    onClick={() => onDelete(row.vehicle_id, row.id)}
                  >
                    <Icon>delete</Icon>
                  </IconButton>
                </StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="w-full h-full p-20 text-2xl">{`There is no maintenance yet :)`}</p>
      )}
    </TableContainer>
  );
}
