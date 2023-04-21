import { connect } from "react-redux";
import { useState} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getFoodData, updateHealth } from '../../Store/Actions/JournalAction.js';
import { useEffect} from 'react';
import {Typography, Button} from '@mui/material';


const FoodSearchInput = (props) => {
    const [selectedFoodList, setSelectedFoodList] = useState([])
    const [totalCal, setTotalCal] =  useState(0)
    const [tempHealthState, setTempHealthState] = useState({...props.customModalProps})

    const { getFoodDataFromAPI, foodNutritionInfo} = props;

    useEffect(() => {
      props.getFoodDataFromAPI();
    },[]); 

    //onClick taking the data and add the object into the record and making the api call
    const onClickSubmit = () => {
      let tempHealth = {}
      let historyArray = [...tempHealthState.history];
      let tempHistory={
          dateTime: new Date(),
          totalValue: Number(totalCal)
      }
      tempHealth.totalValue=tempHealthState.totalValue+ Number(totalCal)
      historyArray.push(tempHistory)
      tempHealth.history = historyArray;
      tempHealth.userUUID = tempHealthState.userUUID;
      props.updateHealth(tempHealthState.userUUID, tempHealthState.userActivityId, tempHealth);
      props.modalClickHandler()
  }

    const onInputChange = (totalCal) => {
        getFoodDataFromAPI(totalCal);
    }

    const handleChange = (event, value) => {
        if(!value || value === "undefined") {
          return
        }
        const totCal = totalCal + parseInt(value?.nutrition?.nutrients[0].amount)
        setTotalCal(totCal)
        const newFoodList = [value, ...selectedFoodList]
        setSelectedFoodList(newFoodList)
      }

    //funtion to show the suggested food
    const __renderAutoCompleteBox = () => {
        const suggestList = foodNutritionInfo?.results

        return (
          <Autocomplete
            disablePortal
            className="food-search"
            id="food auto complete"
            options={suggestList}
            sx={{ width: 600 }}
            renderInput={(params) => 
            <TextField        
              onChange={(e) => onInputChange(e.target.value)}
              {...params} 
              label="Search Food" 
            />}
            getOptionLabel={(suggestList) => suggestList.title}
            onChange={handleChange} 
          />
        );
      }
    
      //function to render the selected food item and add the calories
      const __renderSelectedFoodItems = () => {
        return selectedFoodList && selectedFoodList.map((foodItem, index) => {
          const calAmount = foodItem?.nutrition?.nutrients[0].amount
          return foodItem && (
              <div key={index} className='food-item'>
                <div className='wrap'>
                  <img className='food-img' src={foodItem.image} alt=""/>
                  <span className='food-name'>{foodItem.title}</span>
                </div>
                <div className='food-cal'>{calAmount} {foodItem?.nutrition?.nutrients[0]?.unit}</div>
              </div>
          )
        })
      }

  return (
    <>
        <div className='event-search-wrapper'>
            {__renderAutoCompleteBox()}
          </div>  
          <div className='food-items-wrapper'>
            {__renderSelectedFoodItems()}
            <p className="total-calories">Total Calories: {totalCal} kcal</p>
          </div>
          <div className="save-button-div">
            <Button onClick={onClickSubmit} className="sub-btn" variant="outlined" autoFocus>
                <Typography>Save</Typography>
            </Button>
          </div>          
    </>
  )
  
}

const mapDisptchToProps = (dispatch) => {
  return {
    getFoodDataFromAPI : (inputFoodTxt) => dispatch(getFoodData(inputFoodTxt)),
    // saveHealthData: (inputFoodTxt) => dispatch(saveHealthDetails(inputFoodTxt)),
    updateHealth: (uuid, userActivityId, newHealth)=>dispatch(updateHealth(uuid, userActivityId, newHealth))
  }
} 

const mapStateToProps = (state) => {
  return {
    foodNutritionInfo : state?.Journal?.externalFoodData,
  }
}

export default connect(mapStateToProps, mapDisptchToProps)(FoodSearchInput);
