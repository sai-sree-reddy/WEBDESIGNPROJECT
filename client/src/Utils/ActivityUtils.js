import badminton from '../Assets/Images/badminton.png';
import basketball from '../Assets/Images/basketball.png';
import cycling from '../Assets/Images/cycling.png';
import dancing from '../Assets/Images/dancing.png';
import food from '../Assets/Images/food.png';
import hiking from '../Assets/Images/hiking.png';
import running from '../Assets/Images/running.png';
import sleep from '../Assets/Images/sleep.png';
import strength from '../Assets/Images/strength.png';
import swimming from '../Assets/Images/swimming.png';
import walking from '../Assets/Images/walking.png';
import water from '../Assets/Images/water.png';
import yoga from '../Assets/Images/yoga.png';


export const getActivityLogo= (activityId) =>{
    switch (activityId) {
        case 1: return badminton;
        case 2: return basketball;
        case 3: return cycling;
        case 4: return dancing;
        case 5: return food;
        case 6: return hiking;
        case 7: return running;
        case 8: return sleep;
        case 9: return strength;
        case 10: return swimming;
        case 11: return walking;
        case 12: return water;
        case 13: return yoga;
        default: break;
    }
}

export const getAddActivityLogo= (activityId) =>{
    switch (activityId) {
    
        case 1:  return badminton;
        case 2: return basketball;
        case 3: return cycling;
        case 4: return dancing;
        case 6: return hiking;
        case 7: return running;
        case 9: return strength;
        case 10: return swimming;
        case 11: return walking;
        case 13: return yoga;
        default: break;
    }
}

export const addFavoriteActivity = async (activity)=>{
    try {
    const res = await fetch('http://localhost:9000/useractivity/',{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(activity),
    })
   return await res.json();
    } catch (error) {
      throw new Error("error in post")
    }
      
  }

