import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import './TimelineSelector.scss';
import { SemiBold } from "../../Assets/Fonts/Fonts.js";

const TimelineSelector = (props) =>{
    const [selectedIndex, setSelectedIndex] = useState(0);

    const onSelectOfItem =(option, index)=>{
        props.onClickOfTimeline(option.toLowerCase())
        setSelectedIndex(index);
    }

    return(
        <Grid container className="timeline-selector-main" justifyContent={'center'}>
            <Grid item  display={"flex"} direction={"row"} justifyContent={'center'} className={"timeline-selector-div"}>
                {props.options.map((option, index)=>
                <Grid container  onClick={()=>onSelectOfItem(option.name, index)} className={selectedIndex===index?"timeline-selected":"timeline"} justifyContent={'center'} alignItems={'center'}>
                    <Typography color={selectedIndex===index?'white':'primary'} fontStyle={SemiBold}>{option.name}</Typography>
                </Grid>
                )}
            </Grid>
        </Grid>
    )
}

export default TimelineSelector;