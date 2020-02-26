"Use strict"

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table id="myTable" className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">№</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="left">UserName</StyledTableCell>
            <StyledTableCell align="left">email</StyledTableCell>
            <StyledTableCell align="left">website</StyledTableCell>
            <StyledTableCell align="left">toDo`s</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
		props.rows.map( (row, ind)  => (
				        	                <StyledTableRow key={row.name} onDoubleClick={()=>props.handleOnClick(row.user_id, row.user_name)}>
 				        		                  <StyledTableCell align="center"> {row.user_id>0 ? ind+1 : null} </StyledTableCell>
                                      <StyledTableCell align="left">{row.name} </StyledTableCell>
                                      <StyledTableCell align="left">{row.user_name} </StyledTableCell>
                                      <StyledTableCell align="left">{row.email}</StyledTableCell>
                                      <StyledTableCell align="left">{row.website}</StyledTableCell>
                                      <StyledTableCell align="left">{row.toDo ? "("+row.toDo.length+")" : ""}</StyledTableCell>
                      						</StyledTableRow>
          			            )
				    )
	   }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
