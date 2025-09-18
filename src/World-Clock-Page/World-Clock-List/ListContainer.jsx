import './ListContainer.css';
import CityTime from './CityTime';

function ListContainer({city, setCity}){
  const deleteCity = id => {
    const updatedCity = city.filter( city => 
     city.cityId !== id);
    setCity(updatedCity);
  }

  return(
      <div className="list-container">
       <ul>
          {city.map( city => {
            return (
            <li key={city.cityId}>
            {city.cityName} <CityTime timeZone={city.timeZone}/>
             <div className="delete-container">  
             <button onClick={() => deleteCity(city.cityId)} 
                 className="delete-button">
                  <img src={'./public/garbage-bin.png'} 
                    className="garbage-bin-icon" />
                   <span className="delete-text-tooltip">Delete</span>
             </button>
             </div>
           </li>)
          })}
       </ul>
     </div>
  )
}

export default ListContainer;