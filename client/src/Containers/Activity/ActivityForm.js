import {useState} from 'react';
import {Box, InputAdornment, OutlinedInput, Typography, FormControl, InputLabel, Button} from '@mui/material';
import Theme from '../../Theme.js';
import { connect } from 'react-redux';
import {updateActivity} from '../../Store/Actions/JournalAction.js';

const ActivityForm = (props) => {

const [selectValue, setSelectedValue] = useState(0)
const [selectedDuration, setSelectedDuration] = useState(0)
const [tempActivityState, setTempActivityState] = useState({...props.customModalProps})


  const onSubmitClick = () => {
    let tempActivity = {}
    let historyArray = [...tempActivityState.history];
    let tempHistory = {
      dateTime: new Date(),
      totalValue: Number(selectValue),
      totalDuration: Number(selectedDuration)
    }
    historyArray.push(tempHistory)
    tempActivity.totalValue = tempActivityState.totalValue + Number(selectValue)
    tempActivity.totalDuration = tempActivityState.totalDuration + Number(selectedDuration)
    tempActivity.history = historyArray;
    tempActivity.userUUID = tempActivityState.userUUID
    props.updateActivities(tempActivityState.userUUID,tempActivityState.userActivityId, tempActivity);
    props.modalClickHandler();
  }

  
    return (
      <div>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
      <div>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Total Value</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            value={selectValue}
            onChange={(event)=>setSelectedValue(event.target.value)}
            endAdornment={<InputAdornment position="end">Unit</InputAdornment>}
            label="Amount"
            style={{width: 400, borderColor: 'primary.main'}}
          />
        </FormControl>
      <div>
        <FormControl sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Total Duration</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            //value={values.amount}
            onChange={(event) => setSelectedDuration(event.target.value)}
            endAdornment={<InputAdornment position="end">Time</InputAdornment>}
            label="Amount"
            style={{width: 400}}
          />
        </FormControl>
        </div>
        <div className="save-button-div">
            <Button onClick={onSubmitClick} className="sub-btn" variant="outlined" autoFocus>
                <Typography>Save</Typography>
            </Button>
        </div> 
      </div>
    </Box>
    </div>
    )
  }

  const mapDisptchToProps = (dispatch) => {
    return {
      updateActivities : (uuid, userActivityId, newActivity) => dispatch(updateActivity(uuid, userActivityId, newActivity)),
    }
  } 
  
  const mapStateToProps = (state) => {
    return {
      currentUserDetails : state.Login.currentUserDetails,
    }
  }

  export default connect(mapStateToProps, mapDisptchToProps)(ActivityForm);


