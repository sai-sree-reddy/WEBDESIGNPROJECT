import { Grid, Typography } from '@mui/material';
import { getActivityLogo } from '../../Utils/ActivityUtils';
import './ActivityCard.scss'


const ActivityCard = (props) =>{
    return(
        <div className="activity-card-main" onClick={()=>props.onClick(props.item)}>
            <Grid className='activity-img-container'>
                <img height={180} width={180} src={getActivityLogo(props.logoId)} alt="logo"/>
            </Grid>
            <Grid container display='flex' direction='row' className='activity-stats-container'>
            {props.stat1!==undefined&&
                <Grid item className='activity-stat' xl={6} lg={6} xs={12} sm={6} md={6}>
                    <Typography variant='h6' className='activity-stat-text'>{props.stat1.toString().length>0?props.stat1:'- -'} {props.stat1Unit}</Typography>
                </Grid>}
                {props.stat2!==undefined&&
                <Grid item className='activity-stat' xl={6} lg={6} xs={12} sm={6} md={6}>
                    <Typography  variant='h6' className='activity-stat-text'>{props.stat2.toString().length>0?props.stat2:'- -'} {props.stat2Unit}</Typography>
                </Grid>}
            </Grid>
        </div>
    )
}

export default ActivityCard;