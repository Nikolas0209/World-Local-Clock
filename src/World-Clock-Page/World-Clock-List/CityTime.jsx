import { useState, useEffect } from "react";
import dayjs from "dayjs";
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(timezone);

function CityTime({ timeZone }){
  const [time, setTime] = useState(dayjs().tz(timeZone).format('HH:mm')); 

  useEffect(() => {
    const timeId = setInterval(() => { 
      setTime(dayjs().tz(timeZone).format('HH:mm'));
    }, 1000);
   
    return () => {
     clearInterval(timeId);
    }
  }, [timeZone]); 

  return(
    <>{time}</>
  )
}

export default CityTime;

