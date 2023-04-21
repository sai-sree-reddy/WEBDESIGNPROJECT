import { Grid } from "@mui/material"
import ActivityCard from "../../components/ActivityCard/ActivityCard";
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import "./Dashboard.scss";
import React from "react";
import MiniLoader from "../../components/Loader/MiniLoader";

const ActivitySlider = (props) =>{

    const onClick =(item)=>{
        props.onClickItem(item);
    }
    const onLeftClick =()=>{
       let container = document.getElementById('slider-div');
       sideScroll(container,'left',5,400,10);

    }
    const onRightClick =()=>{
        let container= document.getElementById('slider-div');
        sideScroll(container,'right',5,400,10);
    }

    const sideScroll = (element,direction,speed,distance,step)=>{
        let scrollAmount = 0;
        var slideTimer = setInterval(function(){
            if(direction === 'left'){
                element.scrollLeft -= step;
            } else {
                element.scrollLeft += step;
            }
            scrollAmount += step;
            if(scrollAmount >= distance){
                window.clearInterval(slideTimer);
            }
        }, speed);
    }
    return  (
        
        <Grid className="activity-slider-main" display={'flex'} direction={'row'} justifyContent={'center'}>
            {props.loader?
            <MiniLoader height={250} width={250}/>:
            <React.Fragment>
            <Grid item xs={1} display={'flex'} direction={'column'} alignItems={'center'} className="scroll-option">
                <KeyboardArrowLeft id={'scroll-left'} color="primary" fontSize="large" onClick={onLeftClick} className="scroll-option-icon"/>
            </Grid>
            {props.category==="exercise"&&
            <Grid id="slider-div" xs={12} display={'flex'} direction={'row'}  className="scroll-div">
                {props.activities.map((activity, index)=>
                <ActivityCard stat1={activity.stat1} stat1Unit={activity.stat1Unit} stat2={activity.stat2} stat2Unit={activity.stat2Unit} onClick={onClick} logoId={activity.activityId}/>
                )}
                
            </Grid>
            }
            {props.category==="health"&&
            <Grid id="slider-div" xs={12} display={'flex'} direction={'row'}  className="scroll-div">
                {props.activities.map((activity, index)=>
                <ActivityCard stat1={activity.stat1} stat1Unit={activity.stat1Unit} logoId={activity.activityId}/>
                )}
                
            </Grid>
            }
            <Grid xs={1} item display={'flex'} direction={'column'} className="scroll-option">
                <KeyboardArrowRight color="primary" fontSize="large" onClick={onRightClick} className="scroll-option-icon"/>
            </Grid>
            </React.Fragment>}
        </Grid>
    )
}

export default ActivitySlider;