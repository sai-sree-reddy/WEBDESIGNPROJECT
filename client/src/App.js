import './App.scss';
import { connect } from 'react-redux';
import mainTheme from './Theme.js';
import {ThemeProvider} from '@mui/material/styles';
import RoutesComponent from './Containers/RouteComponent.js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import { setUserToStoreOnRefresh } from './Store/Actions/LoginAction';

toast.configure();

const mapDisptchToProps = (dispatch) => {
  return {
    setUserToStoreOnRefresh : (reduxUser) => dispatch(setUserToStoreOnRefresh(reduxUser)),
  }
} 

const mapStateToProps = (state) => {
  return {
    currentUserDetails : state.Login.currentUserDetails,
  }
}


const App = (props) => {

  const [userSet, setUserSet] = useState(false);
  useEffect(() => {
    async function getUserStats(){
      await props.setUserToStoreOnRefresh(props.currentUserDetails);
      setUserSet(true);
    }
    getUserStats();
  }, [])
  
  return (
    <div className='App'>
      {userSet&&
      <ThemeProvider theme={mainTheme}>
        <RoutesComponent/>
      </ThemeProvider>}
    </div>
  )
}

export default connect(mapStateToProps, mapDisptchToProps)(App);
