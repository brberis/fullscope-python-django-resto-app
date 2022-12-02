import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from "./components/Navigation";
import Footer from './components/Footer/Footer';
import { StoreProvider } from './utils/GlobalState';
import "@mui/material";
import "@emotion/react"; 
import "@emotion/styled"

// import Products from './pages/Products';
// import Contact from './pages/Contact';
import Home from "./pages/Home";
// import Catering from "./pages/Catering";

function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <ResponsiveAppBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/catering-services" element={<Catering />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<Contact />} /> */}
            </Routes>
          </div>
          <Footer />
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
