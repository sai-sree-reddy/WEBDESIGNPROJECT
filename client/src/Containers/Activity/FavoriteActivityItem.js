import { Grid } from '@mui/material';
import { getAddActivityLogo } from '../../Utils/ActivityUtils';
import { assignActivityToUser } from '../../Store/Actions/ActivityActions.js'
import './FavoriteActivityItem.scss';
import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';
import { getUserFavoriteActivities } from '../../Store/Actions/JournalAction';
import { ModalType } from "./../../components/Modal/ModalConstants.js"
import ModalBox from "./../../components/Modal/ModalBox.js";

const mapDispatchToProps = (dispatch) => {
    return {
        getActivityData:(uuid) => dispatch(getUserFavoriteActivities(uuid))

    }
}

const mapStateToProps = (state) => {
    return {
        currentUserDetails: state.Login.currentUserDetails,


    }
}


const FavoriteActivityItem = (props) => {

    const [isModalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(false);

    const onModalHandleClose = (modelType) => {
        setModalOpen(!isModalOpen)
        setModalType(modelType)
    }


    return (
        <Grid item className='activity-img-container' justifyContent={"center"}>
                <img 
                className='image-item'
                height={200} 
                width={200} 
                src={getAddActivityLogo(props.activityMasterId)} 
                alt="logo"
                onClick={() => onModalHandleClose(ModalType.ACTIVITY_MODAL)}
            />
            <ModalBox 
             modalOpen={isModalOpen}
             modalClickHandler={onModalHandleClose}
             modalType={modalType}
             customModalProps= {props}
            />
        </Grid>
        
        
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(FavoriteActivityItem);
