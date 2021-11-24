import React from 'react';
import './App.module.css';
import styles from './App.module.css';
import Header from 'components/Header';
import MainPage from 'pages/MainPage';

function App() {
  return (
    <div className={styles.App}>
      <Header />
      <div className={styles.main}>
        <MainPage />
      </div>
    </div>
  );
}

export default App;
