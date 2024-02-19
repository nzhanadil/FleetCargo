import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import { parseISO, format } from 'date-fns';

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

export default function MaintenanceTable({ tableDatas }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      {tableDatas?.length ? (
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
            {tableDatas?.map(row => (
              <TableRow key={row.created_at}>
                <StyledTableCell component="th" scope="row">
                  {row.description}
                </StyledTableCell>
                <StyledTableCell align="left">{row.priority}</StyledTableCell>
                <StyledTableCell align="left">{format(parseISO(row.due_date), 'MMM dd, yyyy')}</StyledTableCell>
                <StyledTableCell align="center" padding="checkbox">
                  <Checkbox checked={true} inputProps={{ 'aria-label': 'select all desserts' }} />
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
