import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Theme from '../../Theme.js';
import ActivityForm from './ActivityForm.js';
import './PopUpForm.scss';
import ActivityOptions from './ActivityOptions.js';

const PopUpDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const PopUpDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other} color='secondary.light'>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'primary.main',
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export default function PopUpFavActivities() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };



  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Your Favorite Activities
      </Button>

      <PopUpDialog
        
        onClose={handleClose}
        aria-labelledby="popup-dialog-title"
        open={open}
      >
        <PopUpDialogTitle className="popup-dialog-title" onClose={handleClose}>
          Choose Favorite Activities
        </PopUpDialogTitle>

        <DialogContent className='popup-dialog-content'>
            <ActivityOptions />
          
        </DialogContent>
        
        
      
      </PopUpDialog>
    </div>
  );
}
