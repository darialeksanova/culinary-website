import React from 'react';
import styles from './Header.module.css';
import logo from 'assets/logo.png';
import searchIcon from 'assets/searchIcon.svg';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt='logo'></img>
      </div>
      <nav className={styles.navigation}>
        <li className={styles.navigationLink}>Главная</li>
        <li className={styles.navigationLink}>Моя книга рецептов</li>
      </nav>
      <div className={styles.searchIconContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt='search'></img>
      </div>
    </header>
  );
};

export default Header;