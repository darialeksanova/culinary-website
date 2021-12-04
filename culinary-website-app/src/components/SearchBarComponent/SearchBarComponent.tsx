import styles from './SearchBarComponent.module.css';
import SearchFilterComponent from 'components/SearchFilterComponent';
import { useCallback, useState } from 'react';
import classNames from 'classnames/bind';
import { SearchFilterValues } from 'types/searchFilter';

const cx = classNames.bind(styles);

type Props = {
  searchBarValue: string;
  searchFilterValues: SearchFilterValues;
  setSearchFilterValues: (filterValues: SearchFilterValues) => void;
  onSearchBarValueChange: (newValue: string) => void;
  onSearchSubmitButtonClick: (searchBarValue: string) => void;
};

const SearchBarComponent = ({ searchBarValue, searchFilterValues, setSearchFilterValues, onSearchBarValueChange, onSearchSubmitButtonClick }: Props) => {
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);

  const handleFilterButtonClick = useCallback(() => isSearchFilterOpen? setIsSearchFilterOpen(false) : setIsSearchFilterOpen(true), [isSearchFilterOpen]);

  return (
    <div className={styles.searchBarComponent}>
    <div className={styles.searchBarContainer}>
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
        Filter
      </button>
      <button className={styles.searchSubmitButton} onClick={() => onSearchSubmitButtonClick(searchBarValue)}>Search</button>
    </div>
    {isSearchFilterOpen && (
      <>
        <SearchFilterComponent setSearchFilterValues={setSearchFilterValues} searchFilterValues={searchFilterValues}/>
      </>
    )}
    </div>
  );
};

export default SearchBarComponent;