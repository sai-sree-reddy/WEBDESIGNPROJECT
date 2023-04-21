import { Grid, Typography } from "@mui/material"
import "./MessageDisplay.scss";

export const MessageDisplay = (props) =>{
    return(
        <Grid container className="message-display-main" justifyContent={"center"} alignItems={"center"}>
            <Grid item container display={"flex"} direction={"column"}>
                {props.link?
                <Typography variant="h6"><a className="redirect-link" href={props.link}>{props.message}</a></Typography>:
                <Typography className="redirect-link" variant="h6">{props.message}</Typography>}
            </Grid>
        </Grid>
    )
}