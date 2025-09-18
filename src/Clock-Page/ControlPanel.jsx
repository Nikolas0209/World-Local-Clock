import './ControlPanel.css';
import { useNavigate } from 'react-router-dom';

function ControlPanel({setClockOption, optionButton}) {
 const navigate = useNavigate();

 const worldClockButton = () => {
  navigate('/world-clock');
 } 

 const clockString = 
  optionButton ? 'Analog Clock' : 'Digital Clock';

 return(
   <div className="button-div">
      <button onClick={worldClockButton} className="world-clock-button">
       World Clock
      </button>
      <button onClick={setClockOption} className="option-button">
       {clockString}
      </button>
   </div>
  )
}

export default ControlPanel;