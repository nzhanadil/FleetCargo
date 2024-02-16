import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { parseISO, format } from 'date-fns';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'lightGray',
    color: theme.palette.common.black
  },
  body: {
    fontSize: 12
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
    minHeight: 80
  }
});

export default function MaintenanceTable({ tableDatas }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} className="h-full">
      <Table className={classes.table} aria-label="customized table">
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
            <StyledTableRow key={row.created_at}>
              <StyledTableCell component="th" scope="row">
                {row.description}
              </StyledTableCell>
              <StyledTableCell align="left">{row.priority}</StyledTableCell>
              <StyledTableCell align="left">{format(parseISO(row.due_date), 'MMM dd, yyyy')}</StyledTableCell>
              <StyledTableCell align="left">{row.carbs}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
