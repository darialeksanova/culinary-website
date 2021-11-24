import React from 'react';
import styles from './Header.module.css';
import logo from 'assets/logo.png';
import searchIcon from 'assets/searchIcon.svg';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={logo} alt='logo'></img>
      </div>
      <ul className={styles.navigation}>
        <li><NavLink end to='/recipes' className={({ isActive }) => `${styles.navigationLink} ${isActive ? styles.activeLink : ''}`}>Главная</NavLink></li>
        <li><NavLink end to='/my-recipe-book' className={({ isActive }) => `${styles.navigationLink} ${isActive ? styles.activeLink : ''}`}>Моя книга рецептов</NavLink></li>
      </ul>
      <div className={styles.searchIconContainer}>
        <img className={styles.searchIcon} src={searchIcon} alt='search'></img>
      </div>
    </header>
  );
};

export default Header;