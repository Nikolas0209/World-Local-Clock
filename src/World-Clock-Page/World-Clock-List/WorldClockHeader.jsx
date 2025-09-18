import './WorldClockHeader.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cities } from '../data/data.js';
import ErrorMessage from './World-Clock-List/ErrorMessage.jsx';
import PropTypes from 'prop-types';

function WorldClockHeader({city, setCity}){
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
   
  const goBackButton = () => {
    navigate('/');
  }

  const addCity = () => {
    const selectedCity = cities.find((city) => 
      city.cityName.toLowerCase() === inputValue.toLowerCase()
    );

    const showError = message => {
      setErrorMessage(message);
      setInputValue('');
      setTimeout(() => setErrorMessage(''), 3000);
    };

    if(!selectedCity){return showError('Error: Invalid Input!')};

    if(city.some(city => selectedCity.cityName === city.cityName))
      {return showError('Error: This City Has Already Been Displayed!')};

    if(city.length === 5){return showError('Error: The List Is Full!')};

    updateCityClockState(selectedCity);
  }

  const updateCityClockState = selectedCity => {
    const formattedCityName = inputValue
      .toLowerCase()
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    setCity( c => [ ...c, {
       cityId: selectedCity.id,
       cityName: formattedCityName, 
       timeZone: selectedCity.timeZone
      }])
    setInputValue('');
  }

  const handleInputKeyDown = event => {
    event.key === 'Enter' &&  addCity();
    event.key === 'Escape' && setInputValue('');
  }  

  const handleInput = event => {
    setInputValue(event.target.value);
  } 

  return(
    <> 
    <div className="world-clock-header">
      {errorMessage && ( <ErrorMessage errorMessage={errorMessage} /> )} 
    <div>
    <button
      className="go-back-button"
      onClick={goBackButton}>
        Go Back
    </button>
    </div>
    <div className="city-input-section"> 
     <input onChange={handleInput} onKeyDown={handleInputKeyDown} 
      value={inputValue} placeholder="Type here..." />
     <button className="add-button" onClick={addCity} 
       onKeyDown={handleInputKeyDown}>
        Add
     </button>
   </div>
  </div>
  </>
  )
} 

WorldClockHeader.propTypes = {
  city: PropTypes.arrayOf(
    PropTypes.shape({
      cityId: PropTypes.number.isRequired,
      cityName: PropTypes.string.isRequired,
      timeZone: PropTypes.string.isRequired
    })
  ).isRequired,
  setCity: PropTypes.func.isRequired
}

export default WorldClockHeader;

