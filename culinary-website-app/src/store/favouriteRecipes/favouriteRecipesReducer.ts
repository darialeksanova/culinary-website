import { Reducer } from "redux";
import { FavouriteRecipesAction, FavouriteRecipesReducerAction, FavouriteRecipesState } from "./types";

const initialState: FavouriteRecipesState = {
  favouriteRecipes: [],
  favouriteRecipesTotalAmount: 0,
};

export const favouriteRecipesReducer: Reducer<FavouriteRecipesState, FavouriteRecipesReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case FavouriteRecipesAction.LOAD_FAVOURITE_RECIPES: {
      return {
        ...state,
        favouriteRecipes: action.payload,
      };
    }

    case FavouriteRecipesAction.SET_FAVOURITE_RECIPES_TOTAL_AMOUNT: {
      return {
        ...state,
        favouriteRecipesTotalAmount: action.payload,
      };
    }

    default: {
      return state;
    }
  };
};
