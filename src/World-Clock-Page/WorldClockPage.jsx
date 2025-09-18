import './WorldClockPage.css'
import { useState, useEffect } from 'react'
import Footer from '../Components/Footer';
import WorldClockHeader from './WorldClockHeader';
import ListContainer from './World-Clock-List/ListContainer';
import { Helmet } from 'react-helmet';

function WorldClockPage() {
  const [city, setCity] = useState(
    JSON.parse(localStorage.getItem('cities') || '[]'));
 
  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(city));
  }, [city]);
  
  return(
    <div className="world-clock-page">
      <Helmet>
         <title>World Clock</title>
      </Helmet>
   
      <WorldClockHeader city={city} setCity={setCity} />
 
      <ListContainer city={city} setCity={setCity} /> 

    <Footer />
    </div>
  )
}

export default WorldClockPage;
