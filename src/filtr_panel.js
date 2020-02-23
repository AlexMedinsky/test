import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

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
        	<TextField id="filtr_by_name" label="Username" />
        	<TextField id="filtr_by_web" label="website" />
        </ExpansionPanelDetails>
	          <Button onClick={props.onApplyFiltrs}>Применить</Button>
            <Button onClick={props.onResetFiltrs}>Сбросить фильтр</Button>
      </ExpansionPanel>    
    </div>
  );
}