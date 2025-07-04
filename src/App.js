import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import SortingPage from './pages/SortingPage';
import GraphPage from './pages/GraphPage';
import './styles/App.css';
import Footer from './components/Footer';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sorting" element={<SortingPage />} />
        <Route path="/graph" element={<GraphPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

