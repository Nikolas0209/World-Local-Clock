import './Clock.css';
import ControlPanel from './ControlPanel';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Footer from '../Components/Footer';
import { Helmet } from 'react-helmet';

function Clock(){
  const [time, setTime] = useState(dayjs());
  const [optionButton, setOptionButton] = useState(
    JSON.parse(localStorage.getItem('option')) || false
  );

  const displayTime = optionButton 
  ? time.format('h:mm:ss A') : time.format('HH:mm:ss');
 
  useEffect(() => {
    const timeId = setInterval(() => {
     setTime(dayjs());
    }, 1000);
    
    return () => {
      clearInterval(timeId);
    }
  },[]); 

  const setClockOption = () => {
    setOptionButton(prev => {
      const newValue = !prev;  
      localStorage.setItem('option', JSON.stringify(newValue));
      return newValue;
    });
  }
  
  return(
    <div className="clock-page">
    <Helmet>
       <title>Clock</title>
    </Helmet>

     <ControlPanel setClockOption={setClockOption} 
       optionButton={optionButton}/>
     
     <div className="clock-container">
        <div>
         <span>{displayTime}</span>
       </div>
     </div>
     <div className="footer-wrapper">
       <Footer />
     </div>
   </div>  
  )
}

export default Clock;