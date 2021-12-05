import styles from './SearchBarComponent.module.css';
import SearchFilterComponent from 'components/SearchFilterComponent';
import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import filterIcon from 'assets/filter.svg';

const cx = classNames.bind(styles);

type Props = {
  searchBarValue: string;
  onSearchBarValueChange: (newValue: string) => void;
  onSearchSubmitButtonClick: (searchBarValue: string) => void;
  onResetButtonClick: () => void;
};

const SearchBarComponent = ({ searchBarValue, onSearchBarValueChange, onSearchSubmitButtonClick, onResetButtonClick }: Props) => {
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);

  const handleFilterButtonClick = useCallback(() => isSearchFilterOpen? setIsSearchFilterOpen(false) : setIsSearchFilterOpen(true), [isSearchFilterOpen]);

  return (
    <div className={styles.searchBarComponent}>
    <div className={styles.searchBarContainer}>
      <div className={styles.searchInputContainer}>
        <input 
          className={styles.searchInput} 
          type='text' 
          value={searchBarValue}
          placeholder='What do you want to cook today?' 
          onChange={(event) => onSearchBarValueChange(event.target.value)}
        >
        </input>
        <button 
          className={cx({
            searchFilterButton: true,
            searchFilterButtonClicked: isSearchFilterOpen,
          })}
          onClick={handleFilterButtonClick}
        >
          <img className={styles.filterIcon} src={filterIcon} alt='filter'></img>
        </button>
      </div>
      <button 
        className={styles.searchBarButton}
        onClick={onResetButtonClick}
      >
        Reset
      </button>
      <button className={styles.searchBarButton} onClick={() => onSearchSubmitButtonClick(searchBarValue)}>Search</button>
    </div>
    {isSearchFilterOpen && (
      <>
        <SearchFilterComponent />
      </>
    )}
    </div>
  );
};

export default SearchBarComponent;