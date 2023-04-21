import { Dialog, DialogContent, DialogTitle, Grid, Typography } from "@mui/material";
import "./NotificationDialog.scss";

const NotificationDialog =({open, handleClose, content})=>{
    return(
        <Dialog open={open} onClose={handleClose} className="notif-dialog-main">
            <DialogTitle className="notif-dialog-title"><Typography color="secondary.light" variant="h5">Notifications</Typography></DialogTitle>
            
            <DialogContent className="notif-dialog-content">
                {content}
            </DialogContent>
        </Dialog>
    )
}

export default NotificationDialog;