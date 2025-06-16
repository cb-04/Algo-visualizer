import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="card sorting" onClick={() => navigate('/sorting')}>
        Sorting Algorithms
      </div>
      <div className="card graph" onClick={() => navigate('/graph')}>
        Graph Algorithms
      </div>
    </div>
  );
}

export default Home;
