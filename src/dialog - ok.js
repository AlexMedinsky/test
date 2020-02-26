"Use strict"

import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DlgTable from './dlg_table'
 
export default function ScrollDialog(props)
{
  const {handleClose, user_id, user_name, user_toDo} = props;

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
  }, [true]);

  return (
    <div>
      <Dialog
        open="true"
        onClose={handleClose}
        scroll="paper"
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle onClose={handleClose} id="customized-dialog-title">ToDo for Username {user_name} (id={user_id})</DialogTitle>
        <DialogContent dividers="true">
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <DlgTable user_toDo={user_toDo} />

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


/*
function SimpleDialog(props) 
{
  //const classes = useStyles();
  const {  /*selectedValue,* / open, onClose, user_name, user_id, user_toDo } = props;
  const [filtrState, setFiltrState] = React.useState(false);

  const handleClose = () => 
  {
    onClose(/*selectedValue* /);
  };

  /*const handleListItemClick = value => 
  {
    onClose(value);
  };* /
  alert ("user_toDo in Dialog:  " + user_toDo);

  return (
    <Dialog onClose={handleClose} open={open}> scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
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
        </List>* /}
        
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
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');
  
    const handleClickOpen = scrollType => () => {
      setOpen(true);
      setScroll(scrollType);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
      if (open) {
        const { current: descriptionElement } = descriptionElementRef;
        if (descriptionElement !== null) {
          descriptionElement.focus();
        }
      }
    }, [open]);

  return (
      <div>
        <SimpleDialog /*selectedValue={selectedValue}* / open={props.open} onClose={props.handleClose} user_name={props.user_name} user_id={props.user_id} />
      </div>    
  );
}
*/
