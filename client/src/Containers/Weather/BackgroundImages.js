import nightImage from '../../Assets/Images/night.png';
import cloudsImage from '../../Assets/Images/clouds.jpeg';
import rainImage from '../../Assets/Images/rain.jpeg';
import sunnyImage from '../../Assets/Images/sunny.jpeg';
import snowImage from '../../Assets/Images/snow.jpeg';



export default function backGround(description, hour){
        if (description === "Rain" || description==="Drizzle"){
           return {rainImage}.rainImage;
        }
        else if (description === "Snow"){
            return {snowImage}.snowImage;
        } 
        else if (description === "Clear" && hour >= 6 & hour < 18){
            return {sunnyImage}.sunnyImage;
        }
        else if (description === "Clear"){
            return {nightImage}.nightImage;
        }
        else {
            return {cloudsImage}.cloudsImage;
            }
    }