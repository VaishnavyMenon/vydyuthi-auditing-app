import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AddDetails from './pages/AddDetails';
import AddLoad from './pages/AddLoad';
import BasicBuilding from './pages/BasicBuilding';
import BasicEnergy from './pages/BasicEnergy';
import FacilityDetails from './pages/FacilityDetails';
import Landing from './pages/Landing';
import SelectLoad from './pages/SelectLoad';
import Preview from './pages/Preview';

function App() {
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const isMobileDevice = () => {
    return /Mobi|Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent) || window.innerWidth <= 1024;
  };
  
  const [isMobile, setIsMobile] = useState(isMobileDevice());
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 1025);
  useEffect(() => {
    const handleResize = () => {
      // setIsMobile(window.innerWidth <= 1025);
      setIsMobile(isMobileDevice());
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!isMobile) {
    return (
      <div style={{ textAlign: 'center', fontSize: '20px', display:'flex', alignItems:'center', justifyContent:'center', color:"#ff0000", height:"100vh", width:"100vw", margin:"auto" }}>
        This application is only accessible on mobile devices. Please open it on a mobile browser.
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/facility-details" element={<FacilityDetails />} />
        <Route path="/basic-energy" element={<BasicEnergy />} />
        <Route path="/basic-building" element={<BasicBuilding />} />
        <Route path="/add-details" element={<AddDetails />} />
        <Route path="/select-load" element={<SelectLoad />} />
        <Route path="/add-load/:loadType" element={<AddLoad />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
