import styles from './SearchBarComponent.module.css';
import SearchFilterComponent from 'components/SearchFilterComponent';
import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import filterIcon from 'assets/filter.svg';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { Theme } from 'types/theme';

const cx = classNames.bind(styles);

type Props = {
  searchBarValue: string;
  onSearchBarValueChange: ( newValue: string ) => void;
  onSearchSubmitButtonClick: ( searchBarValue: string ) => void;
  onResetButtonClick: () => void;
};

const SearchBarComponent = ({ searchBarValue, onSearchBarValueChange, onSearchSubmitButtonClick, onResetButtonClick }: Props) => {
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);

  const handleFilterButtonClick = useCallback(
    (): void => isSearchFilterOpen? setIsSearchFilterOpen(false) : setIsSearchFilterOpen(true),
    [ isSearchFilterOpen ]
  );

  return (
    <div className={cx({
      searchBarComponent: true,
      searchBarComponentDark: theme === Theme.dark,
    })}>
      <div className={styles.searchBarContainer}>

        <div className={styles.searchInputContainer}>
          <input 
            className={styles.searchInput} 
            type='text' 
            value={searchBarValue}
            placeholder='What do you want to cook today?' 
            onChange={( event ) => onSearchBarValueChange(event.target.value)}
          />
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
        >Reset
        </button>
        
        <button className={styles.searchBarButton} onClick={() => onSearchSubmitButtonClick(searchBarValue)}>Search</button>
      </div>
    
    {isSearchFilterOpen && (
      <SearchFilterComponent />
    )}
    </div>
  );
};

export default SearchBarComponent;