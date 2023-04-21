import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import './ModalBox.scss';
import { ModalType } from './ModalConstants.js';
import FoodSearchInput from '../FoodSearchInput/FoodSearchInput';
import SleepWaterInput from '../SleepWaterInput/SleepWaterInput';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Theme from '../../Theme.js';
import ActivityForm from '../../Containers/Activity/ActivityForm.js';
import ActivityOptions from '../../Containers/Activity/ActivityOptions';


//Generic Modal component used in Journal page
 const ModalBox = (props) => {
  
const { modalOpen, modalClickHandler, customModalProps} = props;


  //modal registry to render different types of modal
  const modelRegistry = () => {
    switch(props.modalType) {
      case ModalType.FOOD_JOURNAL:
        return <FoodSearchInput modalClickHandler={modalClickHandler} customModalProps={customModalProps}/>
      case ModalType.SLEEP_WATER_JOURNAL:
        return <SleepWaterInput modalClickHandler={modalClickHandler} customModalProps={customModalProps}/>
      case ModalType.ACTIVITY_MODAL:
        return <ActivityForm modalClickHandler={modalClickHandler} customModalProps={customModalProps}/>
      case ModalType.ACTIVITY_OPTIONS_MODAL:
        return <ActivityOptions modalClickHandler={modalClickHandler} customModalProps={customModalProps}/>
      default:
        return null;
    }
  }

  //modal title to render based on the modal type
  const getModalTitle = () => {
    switch(props.modalType) {
      case ModalType.FOOD_JOURNAL:
        return "Add your calorie intake for the day"
      case ModalType.SLEEP_WATER_JOURNAL:
      case ModalType.ACTIVITY_MODAL:
        return `Add the ${customModalProps?.name ? customModalProps?.name : "" } stats for the day`
      case ModalType.ACTIVITY_OPTIONS_MODAL:
        return "Choose your favorite activities"
      default:
        return null;
    }
  }

  return (
      <Dialog
        open={modalOpen}
        onClose={modalClickHandler}
        className="modal-container"
      >
        <div className='modal-wrapper'>
        <DialogTitle color='secondary.light'>
        <IconButton
          aria-label="close"
          onClick={modalClickHandler}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'primary.main',
          }}
        >
          <CloseIcon />
        </IconButton>
          {getModalTitle()}
        </DialogTitle>
        <DialogContent className='modal-content'>
          {modelRegistry()}
        </DialogContent>
        </div>
      </Dialog>
  );
}

export default ModalBox;