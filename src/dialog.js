"Use strict"

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DlgTable from './dlg_table';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
    width: 'fit-content',
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    width: 'fit-content',
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

let current_toDo = [];
function handleChexBoxChange(toDo_id)
{
    let ind = current_toDo.findIndex(e=>e.id===toDo_id);
    if(ind >=0 )
      current_toDo[ind].completed = !(current_toDo[ind].completed);
}

export default function SimpleDialog(props) 
{
  const classes = useStyles();
  const { handleClose, user_name, user_toDo } = props;
  current_toDo = user_toDo;
  const [filter, setFilter] = React.useState(1);
  const [changed, setChanged] = React.useState(false);
  
  return (
    <Dialog maxWidth="500" onClose={()=>{handleClose(current_toDo)}} aria-labelledby="customized-dialog-title" open="true">
      <DialogTitle onClose={()=>{handleClose(current_toDo)}} id="customized-dialog-title">Список задач для {user_name}:</DialogTitle>
        <DialogContent dividers>
          
          <div className={classes.root}>
            <Button variant={filter===1?"outlined":""} /*color={filter===1?"primary":""}*/ onClick={()=>{setFilter(1)}}>Все ({current_toDo.filter(e=>(e.id>0)).length})</Button>
            <Button variant={filter===2?"outlined":""}  onClick={()=>{setFilter(2)}}>Завершено ({current_toDo.filter(e=>e.completed&&e.id>0).length})</Button>
            <Button variant={filter===3?"outlined":""}  onClick={()=>{setFilter(3)}}>В работе ({current_toDo.filter(e=>!(e.completed)&&e.id>0).length})</Button>
          </div>

            <DlgTable user_toDo={user_toDo}
                      filter={filter}
                      handleChexBoxChange={handleChexBoxChange}
                      changed={changed}
                      setChanged={setChanged}
            />

        </DialogContent>

        <DialogActions>
            <Button autoFocus onClick={()=>{handleClose(current_toDo)}} color="primary">Закрыть</Button>
        </DialogActions>
    </Dialog>
  );
}


