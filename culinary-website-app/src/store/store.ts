import { applyMiddleware, combineReducers, createStore } from 'redux';
import { recipesPreviewsReducer } from './recipesPreviews/recipesPreviewsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { fullRecipeReducer } from './fullRecipe/fullRecipeReducer';
import { dishNutritionReducer } from './dishNutrition/dishNutritionReducer';

const rootReducer = combineReducers({
  recipesPreviews: recipesPreviewsReducer,
  fullRecipe: fullRecipeReducer,
  dishNutrition: dishNutritionReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
