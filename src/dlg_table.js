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
import { common } from '@material-ui/core/colors';

const StyledTableCell = withStyles(theme => ({
  head: {
    //backgroundColor: theme.palette.common.gray,
    //color: theme.palette.common.white,
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

const MyCheckbox = withStyles({
  root: {
    color: common[400],
    '&$checked': {
      color: common[600],
    },
  },
  checked: {},
})(props => <Checkbox color="default" {...props} />);

export default function CustomizedTables(props) {
  const classes = useStyles();
  const [changed, setChanged] = React.useState(false);
  const { user_toDo, filter, handleChexBoxChange } = props;

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
              !user_toDo || !user_toDo.length ? "" :
                  (user_toDo.filter(e=> ( !(e.id>0) || filter===1 || (filter===2 && e.completed) || (filter===3 && !(e.completed))))).map( (row, ind)  => (
                                                        <StyledTableRow key={row.name} /*onDoubleClick={()=>handleOnClick(row.user_id, row.user_name)} */>
                                                            <StyledTableCell align="center">{row.id> 0 ? ind+1 : null} </StyledTableCell>
                                                            <StyledTableCell style={row.completed? { textDecorationLine: 'line-through' } : null } align="left">{row.title} </StyledTableCell>
                                                            <StyledTableCell align="left">
                                                                {row.id>0 ? <MyCheckbox
                                                                                checked={row.completed}
                                                                                onChange={()=>{ handleChexBoxChange(ind); 
                                                                                                setChanged(!changed)}
                                                                                              }
                                                                                value="myCheckedBox"
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
