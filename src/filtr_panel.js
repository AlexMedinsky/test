import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { Button, TableCell } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

export default function FiltrPanel(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary 
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className={classes.heading} align='right'>Фильтр</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TextField  id="filtr_by_name" /*variant="outlined"*/ label="Username" InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>}} />
        	<TextField id="filtr_by_web" /*variant="outlined"*/ label="website" InputProps={{ startAdornment: <InputAdornment position="start"> </InputAdornment>}} />
        </ExpansionPanelDetails>
        <table border="0" cellpadding="0" align="left">
          <row >
	          <TableCell></TableCell>
            <TableCell><Button size="small" onClick={props.onApplyFiltrs}>Применить</Button></TableCell>
            <TableCell><Button size="small" onClick={props.onResetFiltrs}>Сбросить фильтр</Button></TableCell>
          </row>
        </table>
      </ExpansionPanel>
    </div>
  );
}