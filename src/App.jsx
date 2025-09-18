import Clock from './Clock-Page/Clock';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WorldClockPage from './World-Clock-Page/WorldClockPage';

function App() {
  return (
     <BrowserRouter>
      <Routes>
        <Route index element={<Clock />} />
        <Route path="/world-clock" element={<WorldClockPage />} />
      </Routes>
     </BrowserRouter> 
  )
}

export default App

