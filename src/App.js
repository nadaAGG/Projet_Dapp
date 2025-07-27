import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Exercice1 from './pages/Exercice1';
import Exercice2 from './pages/Exercice2';
import Exercice3 from './pages/Exercice3';
import Exercice4 from './pages/Exercice4';
import Exercice5 from './pages/Exercice5';
import Exercice6 from './pages/Exercice6';
import Exercice7 from './pages/Exercice7';
import Exercice8 from './pages/Exercice8';
import './App.css';

function App() {
  const [lastTransaction, setLastTransaction] = useState(null);

  const handleTransaction = (transaction) => {
    setLastTransaction(transaction);
  };

  return (
    <Router>
      <Layout lastTransaction={lastTransaction}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercice1" element={<Exercice1 onTransaction={handleTransaction} />} />
          <Route path="/exercice2" element={<Exercice2 />} />
          <Route path="/exercice3" element={<Exercice3 onTransaction={handleTransaction} />} />
          <Route path="/exercice4" element={<Exercice4 />} />
          <Route path="/exercice5" element={<Exercice5 />} />
          <Route path="/exercice6" element={<Exercice6 onTransaction={handleTransaction} />} />
          <Route path="/exercice7" element={<Exercice7 onTransaction={handleTransaction} />} />
          <Route path="/exercice8" element={<Exercice8 onTransaction={handleTransaction} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;