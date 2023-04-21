
import { useState } from "react";
import TextField from '@mui/material/TextField';
import './SleepWaterInput.scss'
import { connect } from "react-redux";
import { saveHealthDetails, updateHealth } from '../../Store/Actions/JournalAction.js';
import {Typography, Button} from '@mui/material';

const mapDisptchToProps = (dispatch) => {
    return {
        saveHealth:(healthData) =>dispatch(saveHealthDetails(healthData)),
        updateHealth: (uuid, userActivityId, newHealth)=>dispatch(updateHealth(uuid, userActivityId, newHealth))
    }
  } 
  
  const mapStateToProps = (state) => {
    return {
    }
  }

const SleepWaterInput = (props) => {
    const [inputText, setInput] = useState("")
    const [tempHealthState, setTempHealthState] = useState({...props.customModalProps})

    const onInputChange = (ipTxt) => {
        setInput(ipTxt)
    }

    const onSubmitClick = () => {
        let tempHealth = {}
        let historyArray = [...tempHealthState.history];
        let tempHistory={
            dateTime: new Date(),
            totalValue: Number(inputText)
        }
        tempHealth.totalValue=tempHealthState.totalValue+ Number(inputText)
        historyArray.push(tempHistory)
        tempHealth.history = historyArray;
        tempHealth.userUUID = tempHealthState.userUUID;
        props.updateHealth(tempHealthState.userUUID, tempHealthState.userActivityId, tempHealth);
        props.modalClickHandler();
    }

    return(
        <div className="health-form">
            <span>Enter your {tempHealthState.name} stats </span>
            <TextField        
                onChange={(e) => onInputChange(e.target.value)}
                value={inputText}
                label="Enter Stats"
                className="text-field"
            />
            <div className="save-button-div">
                <Button onClick={onSubmitClick} className="sub-btn" variant="outlined" autoFocus>
                    <Typography>Save</Typography>
                </Button>
            </div> 
        </div>
        
    )
}


export default connect(mapStateToProps, mapDisptchToProps)(SleepWaterInput);
