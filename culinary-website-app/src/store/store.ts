import { applyMiddleware, combineReducers, createStore } from 'redux';
import { recipesPreviewsReducer } from './recipesPreviews/recipesPreviewsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { favouriteRecipesReducer } from './favouriteRecipes/favouriteRecipesReducer';
import { searchFilterValuesReducer } from './searchFilterValues/searchFilterValuesReducer';
import { themeReducer } from './theme/themeReducer';

const rootReducer = combineReducers({
  recipesPreviews: recipesPreviewsReducer,
  favouriteRecipes: favouriteRecipesReducer,
  theme: themeReducer,
  filterValues: searchFilterValuesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
