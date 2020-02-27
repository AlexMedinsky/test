"Use strict"

import React from 'react';
//import PropTypes from 'prop-types';
//import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
//import { blue } from '@material-ui/core/colors';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DlgTable from './dlg_table';


/*const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});*/

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
function handleChexBoxChange(ind)
{
  if(ind < 0 || ind >= current_toDo.length || !current_toDo[ind])
  {
    alert("Error index bound!");
    return;
  }
  current_toDo[ind].completed = !(current_toDo[ind].completed);
}

export default function SimpleDialog(props) 
{
  const { handleClose, user_name, user_toDo } = props;
  current_toDo = user_toDo;

  return (
    <Dialog maxWidth="500" onClose={()=>{handleClose(current_toDo)}} aria-labelledby="customized-dialog-title" open="true">
      <DialogTitle onClose={()=>{handleClose(current_toDo)}} id="customized-dialog-title">Список задач для {user_name}:</DialogTitle>
      <DialogContent dividers>
       {/* <List
        {emails.map(email => (
          <ListItem button onClick={() => handleListItemClick(email)} key={email}>
            <ListItemAvatar>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={email} />
          </ListItem>
        ))}
        </List>*/
       
        }
        <DlgTable user_toDo={user_toDo}
                  handleChexBoxChange={handleChexBoxChange
        }/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={()=>{handleClose(current_toDo)}} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}


