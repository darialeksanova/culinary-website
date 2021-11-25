import { applyMiddleware, combineReducers, createStore } from 'redux';
import { recipesPreviewsReducer } from './recipes/recipesPreviewsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  recipesPreviews: recipesPreviewsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
