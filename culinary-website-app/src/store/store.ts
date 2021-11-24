import { combineReducers, createStore } from 'redux';
import { recipesReducer } from './recipes/recipesReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  recipes: recipesReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools());