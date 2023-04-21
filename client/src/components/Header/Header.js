
import { Link, Outlet, useNavigate } from "react-router-dom";
import './Header.scss'
import AppLogo from "../../Assets/Images/husky.svg"
import { Button, IconButton, Typography } from "@mui/material";
import { logout } from "../../Store/Actions/LoginAction";
import { connect } from "react-redux";
import Notifications from "@mui/icons-material/Notifications";
import { useState } from "react";
import NotificationDialog from "../../Containers/NotificationDialog/NotificationDialog";
import EventNotificationContent from "../../Containers/NotificationDialog/EventNotificationContent";

const Header = (props) => {
  const navigate = useNavigate();
  const [openNotif, setOpenNotif] = useState(false);

  const signoutClick =async()=>{
    let res = await props.logout();
    if(res){
      navigate("/login");
    }
  }

  const onClickOfNotififcation=()=>{
    setOpenNotif(true);
  }

  const handleNotificationClose =()=>{
    setOpenNotif(false);
  }

  return (
    <div className="main-layout-container"> 
        <div className="header-wrapper">
          <div className="header-logo">
              <img alt="app-logo" src={AppLogo} />
          </div>
            <nav className="header-nav"> 
                <Typography paddingRight={2} color='secondary.light'><Link to="/">Dashboard</Link></Typography>
                <Typography paddingRight={2} color='secondary.light'><Link to="/journal">Journal</Link></Typography>
                <Typography paddingRight={2} color='secondary.light'><Link to="/events">Events</Link></Typography>
                <Typography paddingRight={2} color='secondary.light'><Link to="/weather">Weather</Link></Typography>
                <Typography color='secondary.light'><Link to="/profile">Profile</Link></Typography>
                
                <IconButton size={"large"} children ={<Notifications className="notifications-btn"/>} onClick={onClickOfNotififcation}/>
                <Typography paddingRight={2} color='secondary.light'><Button  onClick={signoutClick} variant="outlined" size="small" className="signout-btn">Sign Out</Button></Typography>
            </nav>
        </div>
        <NotificationDialog open={openNotif} handleClose={handleNotificationClose} content={<EventNotificationContent/>}/>
        <Outlet/>
    </div> 
  )
  
}

const mapDispatchToProps = (dispatch) => {
  return {
      logout : () => dispatch(logout()),
  }
}

export default connect(null, mapDispatchToProps)(Header);
