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
import Checkbox from '@material-ui/core/Checkbox';
import { green } from '@material-ui/core/colors';

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

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [changed, setChanged] = React.useState(false);

  return (
    <TableContainer component={Paper}>
      <Table id="myTable" className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">№</StyledTableCell>
            <StyledTableCell align="left">Поручение</StyledTableCell>
            <StyledTableCell align="left">Статус</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
              !props.user_toDo || !props.user_toDo.length ? "" :
                  props.user_toDo.map( (row, ind)  => (
                                                        <StyledTableRow key={row.name} /*onDoubleClick={()=>props.handleOnClick(row.user_id, row.user_name)} */>
                                                            <StyledTableCell align="center">{row.id> 0 ? ind+1 : null} </StyledTableCell>
                                                            <StyledTableCell style={row.completed? { textDecorationLine: 'line-through' } : null } align="left">{row.title} </StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                {row.id>0 ? <GreenCheckbox
                                                                                checked={row.completed}
                                                                                onChange={()=>{ props.handleChexBoxChange(ind); 
                                                                                                setChanged(!changed)}
                                                                                              }
                                                                                value="checkedG"
                                                                            />
                                                                          : ""}
                                                            </StyledTableCell>
                                                        </StyledTableRow>
          			                                    )
                                      )
              
	        }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
