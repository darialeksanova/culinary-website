import { SyntheticEvent } from 'react';
import { SearchFilterValues } from 'types/searchFilter';
import styles from './SearchFilterComponent.module.css';

type Props = {
  searchFilterValues: SearchFilterValues;
  setSearchFilterValues: (filterValues: SearchFilterValues) => void;
};

const SearchFilterComponent = ({ searchFilterValues, setSearchFilterValues }: Props) => {
  const handleSearchFilterValuesChange = (event: SyntheticEvent) => {
    const eventTarget = event.target as HTMLInputElement;
    if (eventTarget.value === 'dairy-free') {
      setSearchFilterValues({...searchFilterValues, isDairyFree: eventTarget.checked});
    } else if (eventTarget.value === 'gluten-free') {
      setSearchFilterValues({...searchFilterValues, isGlutenFree: eventTarget.checked});
    } else if (eventTarget.value === 'vegetarian') {
      setSearchFilterValues({...searchFilterValues, isVegetarian: eventTarget.checked});
    } else if (eventTarget.value === 'vegan') {
      setSearchFilterValues({...searchFilterValues, isVegan: eventTarget.checked});
    };
  };

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} id='dairyFree' type='checkbox' value='dairy-free' onClick={(event: SyntheticEvent) => handleSearchFilterValuesChange(event)}></input>
        <label htmlFor='dairyFree'>Dairy free</label>
      </div>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} type='checkbox' value='gluten-free' onClick={(event: SyntheticEvent) => handleSearchFilterValuesChange(event)}></input>
        <label htmlFor='glutenFree'>Gluten free</label>
      </div>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} type='checkbox' value='vegetarian' onClick={(event: SyntheticEvent) => handleSearchFilterValuesChange(event)}></input>
        <label htmlFor='vegetarian'>Vegetarian</label>
      </div>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} type='checkbox' value='vegan' onClick={(event: SyntheticEvent) => handleSearchFilterValuesChange(event)}></input>
        <label htmlFor='vegan'>Vegan</label>
      </div>
    </div>
  );
};

export default SearchFilterComponent;