import React from 'react';
import { Link } from 'react-router-dom';
import BlockchainInfo from './BlockchainInfo';
import TransactionInfo from './TransactionInfo';
import './Layout.css';

const Layout = ({ children, lastTransaction }) => {
  return (
    <div className="layout">
      <header className="header">
        <h1>dApp TP3 - Blockchain & Web3</h1>
        <nav>
          <Link to="/" className="nav-link">Accueil</Link>
        </nav>
      </header>
      
      <div className="main-content">
        <aside className="sidebar">
          <BlockchainInfo />
          <TransactionInfo transaction={lastTransaction} />
        </aside>
        
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;