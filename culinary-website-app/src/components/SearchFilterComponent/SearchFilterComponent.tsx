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
        <label htmlFor='dairyFree'>
          <input 
            className={styles.searchFilterInput} 
            id='dairyFree' 
            type='checkbox' 
            value='dairy-free' 
            checked={searchFilterValues.isDairyFree} 
            onChange={handleSearchFilterValuesChange}
          />
          Dairy free
        </label>
      </div>

      <div className={styles.searchFilterItem}>
        <label htmlFor='glutenFree'>
          <input 
            className={styles.searchFilterInput} 
            id='glutenFree'
            type='checkbox' 
            value='gluten-free' 
            checked={searchFilterValues.isGlutenFree} 
            onChange={handleSearchFilterValuesChange}
          />
          Gluten free
        </label>
      </div>

      <div className={styles.searchFilterItem}>
        <label htmlFor='vegetarian'>
          <input 
            className={styles.searchFilterInput} 
            id='vegetarian'
            type='checkbox' 
            value='vegetarian' 
            checked={searchFilterValues.isVegetarian} 
            onChange={handleSearchFilterValuesChange}
          />
          Vegetarian
        </label>
      </div>

      <div className={styles.searchFilterItem}>
        <label htmlFor='vegan'>
          <input 
            className={styles.searchFilterInput} 
            id='vegan'
            type='checkbox' 
            value='vegan' 
            checked={searchFilterValues.isVegan} 
            onChange={handleSearchFilterValuesChange}
          />
          Vegan
        </label>
      </div>
    </div>
  );
};

export default SearchFilterComponent;