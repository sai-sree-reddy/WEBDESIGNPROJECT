import { useEffect } from "react";
import { connect } from 'react-redux';
import { getEventBriteEvents, saveInterestedEvent } from "../../Store/Actions/EventsAction";
import './Events.scss';
import EventSearchBar from "./EventSearchBar";
import Loader from '../../components/Loader/Loader.js'
import { Grid } from "@mui/material";

const mapDisptchToProps = (dispatch) => {
    return {
        getEventBriteEvent: () => dispatch(getEventBriteEvents()),
        postInterestEvent: (interestedEvent) => dispatch(saveInterestedEvent(interestedEvent))
    }
  } 
  
  const mapStateToProps = (state) => {
    return {
      eventsList: state?.Events?.eventsData?._embedded,
      isLoading: state?.Loader?.showLoader,
      currentUserDetails: state.Login.currentUserDetails
    }
  }

const Events = (props) => {
  const { eventsList, isLoading, getEventBriteEvent, postInterestEvent} = props;

  useEffect(() => {
      getEventBriteEvent();
  },[]); 



  const __renderEventCards = () => {
      if (eventsList && eventsList.events && eventsList.events.length > 0) {
      return eventsList.events.map((item, index) => {
        const { images, name, priceRanges, classifications, dates, _embedded, url, info, id} = item;
        return item && (
        <div key={index} className="card-wrapper" href={url}>
          <div className="left-part">
            {images && images.length > 0 && <img src={images[0]?.url} alt="event-img"/> }
          </div>
          <div className="right-part">
            <div className="card-title">
              <h2>{name}</h2>
              {priceRanges && priceRanges.length > 0  ? 
              <div>${priceRanges[0]?.min} - ${priceRanges[0].max}</div> : 
              <div> Free </div>
              }
            </div>
            { classifications && classifications.length > 0 && <span>Genre: {classifications[0]?.genre?.name}</span>}
            { info ?  
            <p className="info">{info}</p> : 
            <p className="info">
              Tickets available for the Preliminary Event! Book the tickets Now. Best Offer available at out website. Click on Learn More!
            </p>} <br /><br /><br />

            
            <span>Date : {dates?.start?.localDate}</span>
            <span>Time : {dates?.start?.localTime}</span>
            <div className="right-bottom">
              { _embedded && _embedded.venues && <a className="venue" target="_blank" href="https://www.google.com/maps/place/The+Cabaret+Theatre/@41.4907997,-72.0910041,17z/data=!3m2!4b1!5s0x89e673ab8f5f95f5:0xbb811745902c4520!4m5!3m4!1s0x89e673ab7efcef35:0xbb48f13d9c3876dc!8m2!3d41.4907997!4d-72.0888154">
                Venue : {_embedded?.venues[0]?.name}
              </a> }
            <div>
                <button onClick={()=> saveEventData(item)} className="event-button"> Interested </button>
                <button onClick={()=> window.open(url)} className="event-button"> Learn More </button>
              </div>
            </div>
          </div>
        </div>
        )
      })
    } else {
      return (
        <Grid className="not-result" style={{minHeight:"100vh"}}>
          <h1> Sorry no results found</h1>
        </Grid>
      )
    }
  }

  const saveEventData = (data) => {
    const interestedEvent = {
      eventId: data.id,
      eventName: data.name,
      eventDate: data.dates?.start?.localDate,
      eventTime: data.dates?.start?.localTime,
      userUUID: props.currentUserDetails.uuid
    }
    postInterestEvent(interestedEvent)
  }

  return isLoading ? <Loader/> : (
    <div className="events-container">
      <h1 className="event-title">EVENTS</h1>
      <EventSearchBar />
      {__renderEventCards()}
    </div>
  );
}

export default connect(mapStateToProps, mapDisptchToProps)(Events);
