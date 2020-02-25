"Use strict"

import React from 'react';
import PropTypes from 'prop-types';
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
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

function SimpleDialog(props) 
{
  //const classes = useStyles();
  const {  /*selectedValue,*/ open, onClose, user_name, user_id, user_toDo } = props;
  const [filtrState, setFiltrState] = React.useState(false);

  const handleClose = () => 
  {
    onClose(/*selectedValue*/);
  };

  /*const handleListItemClick = value => 
  {
    onClose(value);
  };*/
  alert ("user_toDo in Dialog:  " + user_toDo);

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle onClose={handleClose} id="customized-dialog-title">ToDo for Username {user_name} (id={user_id})</DialogTitle>
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
        </List>*/}
        <DlgTable user_toDo/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  //selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo(props) 
{
  /*const [open, setOpen] = React.useState(props.open);
  //const [selectedValue, setSelectedValue] = React.useState(emails[1]);

  const handleClickOpen = () => 
  {
    setOpen(true);
  };

  const handleClose = value => 
  {
    setOpen(false);
    //setSelectedValue(value);
  };
*/
  return (
      <div>
        <SimpleDialog /*selectedValue={selectedValue}*/ open={props.open} onClose={props.handleClose} user_name={props.user_name} user_id={props.user_id} />
      </div>    
  );
}
