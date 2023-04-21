import '../Dashboard/Dashboard.scss';
import DashboardSection from '../Dashboard/DashboardSection';
import Options from './Options.js'
import './Journal.scss'
import { useEffect} from 'react';
import { getHealthData} from '../../Store/Actions/JournalAction.js';
import { connect } from 'react-redux';

const mapDisptchToProps = (dispatch) => {
    return {
      getHealthData : (uuid) => dispatch(getHealthData(uuid)),
    }
  } 

  const mapStateToProps = (state) => {
    return {
        healthData: state.Journal.healthData,
        currentUserDetails: state.Login.currentUserDetails,
    }
}

const Journal = (props) => {

    useEffect(() => {
        props.getHealthData(props.currentUserDetails.uuid)
      },[]); 
    
    return(
       <div id="dashboard-main" className='journal-div dashboard-main'>
        <DashboardSection title="MY FITNESS JOURNAL"  
        content = {<Options options={props.healthData}/>}
        />
    </div>
    );
}

export default connect(mapStateToProps, mapDisptchToProps)(Journal);
