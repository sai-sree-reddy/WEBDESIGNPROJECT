
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import './Events.scss';
import { getEventBriteEvents } from "../../Store/Actions/EventsAction";
import { connect } from 'react-redux';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';

const mapDisptchToProps = (dispatch) => {
    return {
        getEventBriteEvent: (inputText) => dispatch(getEventBriteEvents(inputText))
    }
  } 
  
  const mapStateToProps = (state) => {
    return {
    }
  }

const EventSearchBar = (props) => {
    const [inputText, setInputText] = useState("")

    const onInputChange = (inputText) => {
        setInputText(inputText)
    }

    return(
    <div className='event-search-wrapper'>
        <TextField
        className='event-text-field'
          label="Search Events"
          id="textfield"
          InputProps={{
            endAdornment: 
            <InputAdornment position="end"> 
              <KeyboardReturnIcon onClick={() => props.getEventBriteEvent(inputText)}/>
            </InputAdornment>
          }}
          placeholder="Search Events"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
        />
    </div>
    );
}

export default connect(mapStateToProps, mapDisptchToProps)(EventSearchBar);
