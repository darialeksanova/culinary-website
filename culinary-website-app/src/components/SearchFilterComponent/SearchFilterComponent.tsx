import { SyntheticEvent, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './SearchFilterComponent.module.css';
import { setSearchFilterValues } from 'store/searchFilterValues/actions';
import { RootState } from 'store/store';

const SearchFilterComponent = () => {
  const dispatch = useDispatch();
  const searchFilterValues = useSelector(( state: RootState ) => state.filterValues);

  const handleSearchFilterValuesChange = useCallback(( event: SyntheticEvent ): void => {
    const eventTarget = event.target as HTMLInputElement;

    if (eventTarget.value === 'dairy-free') {
      dispatch(setSearchFilterValues({isDairyFree: eventTarget.checked}));
    } else if (eventTarget.value === 'gluten-free') {
      dispatch(setSearchFilterValues({isGlutenFree: eventTarget.checked}));
    } else if (eventTarget.value === 'vegetarian') {
      dispatch(setSearchFilterValues({isVegetarian: eventTarget.checked}));
    } else if (eventTarget.value === 'vegan') {
      dispatch(setSearchFilterValues({isVegan: eventTarget.checked}));
    }
  }, [ dispatch ]);

  return (
    <div className={styles.searchFilterContainer}>
      <div className={styles.searchFilterItem}>
        <input className={styles.searchFilterInput} 
          id='dairyFree' 
          type='checkbox' 
          value='dairy-free' 
          checked={searchFilterValues.isDairyFree} 
          onChange={handleSearchFilterValuesChange}
        />
        <label htmlFor='dairyFree'>Dairy free</label>
      </div>

      <div className={styles.searchFilterItem}>
        <input 
          className={styles.searchFilterInput} 
          type='checkbox' 
          value='gluten-free' 
          checked={searchFilterValues.isGlutenFree} 
          onChange={handleSearchFilterValuesChange}
        />
        <label htmlFor='glutenFree'>Gluten free</label>
      </div>

      <div className={styles.searchFilterItem}>
        <input 
          className={styles.searchFilterInput} 
          type='checkbox' 
          value='vegetarian' 
          checked={searchFilterValues.isVegetarian} 
          onChange={handleSearchFilterValuesChange}
        />
        <label htmlFor='vegetarian'>Vegetarian</label>
      </div>

      <div className={styles.searchFilterItem}>
        <input 
          className={styles.searchFilterInput} 
          type='checkbox' 
          value='vegan' 
          checked={searchFilterValues.isVegan} 
          onChange={handleSearchFilterValuesChange}
        />
        <label htmlFor='vegan'>Vegan</label>
      </div>
    </div>
  );
};

export default SearchFilterComponent;