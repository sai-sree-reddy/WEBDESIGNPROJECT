import { Grid, Typography } from "@mui/material"
import TimelineSelector from "../../components/TimelineSelector/TimelineSelector";
import { timelineSelectorOptions } from "../../Stub/stub.js";
import './Dashboard.scss';
import Theme from '../../Theme.js'


const DashboardSection = (props) =>{
    return(
        <div className="dashboard-section-main">
            <Grid display='flex' direction='column'>
                <Grid className="title-container">
                    <Typography variant="h4" fontWeight={'bolder'}  color='secondary'>{props.title}</Typography>
                </Grid>
                {props.selector&&
                <Grid className="selector-container">
                    <TimelineSelector options={timelineSelectorOptions} onClickOfTimeline={props.onClickOfTimeline}/>
                </Grid>}
                {props.content}
                
            </Grid>
        </div>
    )
}

export default DashboardSection;