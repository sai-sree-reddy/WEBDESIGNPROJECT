import { Button, Typography} from "@mui/material"
// import SleepImg from "../../Assets/Images/sleep.png"
// import Food from "../../Assets/Images/food.png"
// import Water from "../../Assets/Images/water-1.png"
import './Options.scss';
import Theme from '../../Theme.js';
import ModalBox from "../../components/Modal/ModalBox.js";
import { useState, useEffect } from "react";
import { ModalType, getModalTypesBasedOnNames } from '../../components/Modal/ModalConstants.js';
import FavoriteActivities from '../Activity/FavoriteActivitiesDisplay.js';
import { Grid } from "@mui/material";
import DashboardSection from "../Dashboard/DashboardSection";
import { getActivityMasterData } from '../../Store/Actions/JournalAction.js';
import { connect } from 'react-redux';
import { getActivityLogo } from '../../Utils/ActivityUtils';

const Options = (props) =>{
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(false);
    const [selectedHealth, setSelectedHealth] = useState(null);

    useEffect(() => {
        props.getActivityData()
    },[]);

    const onModalHandleClose = (option)=> {
        setSelectedHealth(option)
        setModalOpen(!isModalOpen)
        const modTypes = getModalTypesBasedOnNames(option.name ? option.name : option)
        setModalType(modTypes)
    }

    return(
    <div>
        <Typography className= "log-away" variant="h5" color={Theme.palette.primary.main}> Log away your day!</Typography>  
         <br />
         <Button variant="outlined" onClick={() => onModalHandleClose(ModalType.ACTIVITY_OPTIONS_MODAL)}>
                 Add Your Favorite Activities
        </Button>
        <div className="options-div" > 
        {props.options.map((option, index)=>
            <Button 
                key={index} className="activity-button-image" 
                onClick={()=>onModalHandleClose(option)}> 
            <img src={getActivityLogo(option.activityMasterId)} height="450px" ></img>
            </Button>
        )}

        </div>
        <ModalBox 
            modalOpen={isModalOpen}
            modalClickHandler={onModalHandleClose}
            modalType={modalType}
            customModalProps = {selectedHealth}
        />

        <Grid className='divider'> </Grid>
        <div className="favorite-activities" id="favorite-activities">
        <DashboardSection  title="Your Favorite Activities" 
            content={ 
                <FavoriteActivities activities={props.userFavoriteActivities} 
                />
            }/>
        </div>
    </div> 
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        getActivityData:() => dispatch(getActivityMasterData())
    }
}

const mapStateToProps = (state) => {
    return {
        activityMasterData: state?.Journal?.setActivityMasterData,
        userFavoriteActivities: state?.Activity?.userActivities
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Options);
