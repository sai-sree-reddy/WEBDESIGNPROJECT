import React, {useEffect, useState} from 'react';
import { Card, CardContent, dialogTitleClasses, ListItemSecondaryAction, Typography } from '@mui/material';
import './Weather.scss';
import { useTheme } from '@mui/material';
import { TextField } from '@mui/material';
import {SemiBold} from '../../Assets/Fonts/Fonts.js';
import backGround from '../Weather/BackgroundImages.js';
import Loader from '../../components/Loader/Loader.js';
import { connect } from 'react-redux';
import Theme from '../../Theme.js';

const mapStateToProps = (state) => {
    return {
        isLoading: state?.Loader?.showLoader
    }
}

function Weather(props) { 

    
     const apiKey =  'e36fa2f65b912b042203a63c33cfb926';
     const [weatherData, setweatherData] = useState(null);
     const [city, setCity] = useState("Boston");
     const units= 'metric';
     const [loader, setLoader] = useState(false);
     
    useEffect(() => {
      searchWeather({key: "Enter"})
    }, [])
    
    const searchWeather = async (event) => {
                if (event.key === "Enter") {
        
                    try{
                        setLoader(true);
                        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`)
                        let data = await response.json();
                        let lat = data.coord.lat;
                        let lon = data.coord.lon;
                        await getDatafor7days(lat, lon);
                        setLoader(false);
                    }
                    catch (error){
                        setLoader(false);
                        console.log(error);            
                    }
                    
                }
            }
        
        
            const getDatafor7days = async (lat, lon) => {
                let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}&exclude=minutely,alerts`;
                try {
                  let res = await fetch(url);
                  let response = await res.json();
                  console.log("data", response);
                  setweatherData(response);
                
                } catch (error) {
                  throw error;
                }
                
            };

            const convertDateFromEpoch = (index) => {
                const apiDt = weatherData?.daily[index]?.dt
                const milliseconds = (apiDt*1000);
                const dateFromApi = new Date(milliseconds);
                const humanDate = dateFromApi.toLocaleDateString("en-US",{weekday: 'short'});
                return humanDate;
            }
        

    const theme = useTheme();
    
    const currentWeatherDescription= weatherData?.current?.weather[0].main;
    console.log("current weather = " + currentWeatherDescription);
    
    const apiDateTime = new Date(((weatherData?.current?.dt)+weatherData?.timezone_offset)*1000).getHours();
    const currentHour = apiDateTime+4;
    
    console.log("current hour = "+ (currentHour));
    const backGroundImage = backGround(currentWeatherDescription, currentHour);
    
    console.log(backGroundImage);
    
    return (
<div className = "container" style={{backgroundImage: `url(${backGroundImage})`}}>
    {weatherData === 'undefined' ? (
            <div> 
                <div className='searchBox'>        
                <input 
                    className= "input" 
                    placeholder="Enter City..." 
                    onChange={e=>setCity(e.target.value)}
                    value={city} 
                    onKeyPress={searchWeather}/>
                    {/* <p>Please enter a city</p> */}
            </div>
            
            </div>
            ) : 
            (
                loader?
                <Loader/>:
                <div classname="entireWeatherPage"> 
                <div className='searchBox'>        
                            <input 
                                className= "input" 
                                placeholder="Enter City..." 
                                onChange={e=>setCity(e.target.value)}
                                value={city} 
                                onKeyPress={searchWeather}
                                fontFamily={SemiBold}/>
                        </div>        
                        
                    <div className='currentWeatherDiv'>
                                <Card className='currentWeather' style={{backgroundColor: Theme.palette.primary.light}}>
                                <CardContent>
                                    <Typography color='secondary.light' fontFamily={SemiBold}>
                                    {/* <h2>City Name</h2> */}
                                    <p className='currentTemp'>{Math.round(weatherData?.current?.temp)}<span>&#176;C</span></p>
                                    <p classname='weatherDescription'>{weatherData?.current?.weather[0].main}</p>
                                    </Typography>
                                </CardContent>
                                </Card>
                    </div>
                    
            
                    <div>
            
                        <div className='currentWeatherDetailsDiv'>
                        <Typography color='secondary.light'>
                            <p classname="currentWeatherFeelsLike">Feels like: {Math.round(weatherData?.current?.feels_like)}<span>&#176;</span>C</p>
                            <p classname="currentWeatherWind">Wind: {weatherData?.current?.wind_speed} kmph </p>
                        </Typography>
                        
                        </div>
                        <div className='currentWeatherDetailsDiv'>
                        <Typography color='secondary.light'>
                            <p classname="currentWeatherVisibility">Visibility: {Math.round(weatherData?.current?.visibility/1000)} km</p>
                            <p classname="currentWeatherHumidity">Humidity: {weatherData?.current?.humidity} %</p>
                        </Typography>
                        </div>
                    </div>
                    
                    <div className='everydayWeatherDiv'>
                        <Card className='everydayWeather' elevation={10} style={{backgroundColor: Theme.palette.primary.light}}>
                            <CardContent >
                            <Typography color='secondary.light'>
                                <h4>Today</h4>
                                <h2><span className='maxTemp'>{Math.round(weatherData?.daily[0]?.temp.max)}</span></h2>
                                <h3><span className='minTemp'> {Math.round(weatherData?.daily[0]?.temp.min)}</span></h3>
                                <h4>{weatherData?.daily[0]?.weather[0].main}</h4>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='everydayWeather' elevation={10} style={{backgroundColor: Theme.palette.primary.light}}>
                            <CardContent>
                            <Typography color='secondary.light'>
                                <h4>Tomorrow</h4>
                                <h2><span className='maxTemp'>{Math.round(weatherData?.daily[1]?.temp.max)}</span></h2>
                                <h3><span className='minTemp'> {Math.round(weatherData?.daily[1]?.temp.min)}</span></h3>                                
                                <h4>{weatherData?.daily[1]?.weather[0].main}</h4>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='everydayWeather' elevation={10} style={{backgroundColor: Theme.palette.primary.light}}>
                            <CardContent classname = 'everydayCardContent'>
                            <Typography color='secondary.light'>
                                <h4>{convertDateFromEpoch(2)}</h4>
                                <h2><span className='maxTemp'>{Math.round(weatherData?.daily[2]?.temp.max)}</span></h2>
                                <h3><span className='minTemp'> {Math.round(weatherData?.daily[2]?.temp.min)}</span></h3>                                
                                <h4>{weatherData?.daily[2]?.weather[0].main}</h4>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='everydayWeather' elevation={10} style={{backgroundColor: Theme.palette.primary.light}}>
                            <CardContent>
                            <Typography color='secondary.light'>
                            <h4>{convertDateFromEpoch(3)}</h4>
                            <h2><span className='maxTemp'>{Math.round(weatherData?.daily[3]?.temp.max)}</span></h2>
                            <h3><span className='minTemp'> {Math.round(weatherData?.daily[3]?.temp.min)}</span></h3>                                
                            <h4>{weatherData?.daily[3]?.weather[0].main}</h4>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='everydayWeather' elevation={10} style={{backgroundColor: Theme.palette.primary.light}}>
                            <CardContent>
                            <Typography color='secondary.light'>
                            <h4>{convertDateFromEpoch(4)}</h4>
                            <h2><span className='maxTemp'>{Math.round(weatherData?.daily[4]?.temp.max)}</span></h2>
                            <h3><span className='minTemp'> {Math.round(weatherData?.daily[4]?.temp.min)}</span></h3>                                
                            <h4>{weatherData?.daily[4]?.weather[0].main}</h4>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='everydayWeather' elevation={10} style={{backgroundColor: Theme.palette.primary.light}}>
                            <CardContent >
                            <Typography color='secondary.light'>
                            <h4>{convertDateFromEpoch(5)}</h4>
                            <h2><span className='maxTemp'>{Math.round(weatherData?.daily[5]?.temp.max)}</span></h2>
                                <h3><span className='minTemp'> {Math.round(weatherData?.daily[5]?.temp.min)}</span></h3>                               
                                <h4>{weatherData?.daily[5]?.weather[0].main}</h4>
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card className='everydayWeather' elevation={10} style={{backgroundColor: Theme.palette.primary.light}}>
                            <CardContent>
                            <Typography color='secondary.light'>
                            <h4>{convertDateFromEpoch(6)}</h4>
                            <h2><span className='maxTemp'>{Math.round(weatherData?.daily[6]?.temp.max)}</span></h2>
                                <h3><span className='minTemp'> {Math.round(weatherData?.daily[6]?.temp.min)}</span></h3>                                
                                <h4>{weatherData?.daily[6]?.weather[0].main}</h4>
                                </Typography>
                            </CardContent>
                        </Card>
                    </div>
                </div> 

             )}

</div>

  )
}


export default connect(mapStateToProps)(Weather);

