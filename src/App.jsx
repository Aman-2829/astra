import React from 'react';
import './App.css';
import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const location = useLocation();
  useEffect(() => { 
    window.scrollTo(0, 0);
  }, [location]);  
  return null;
}
function App() {
  return (
    <section className=''>
      <ScrollToTop />  
     <Outlet/>
    </section>
  );
}
export default App;