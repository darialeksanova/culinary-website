import { Reducer } from "redux";
import { FavouriteRecipesAction, FavouriteRecipesReducerAction, FavouriteRecipesState } from "./types";

const initialState: FavouriteRecipesState = {
  favouriteRecipes: [],
};

export const favouriteRecipesReducer: Reducer<FavouriteRecipesState, FavouriteRecipesReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case FavouriteRecipesAction.LOAD_FAVOURITE_RECIPES: {
      return {
        ...state,
        favouriteRecipes: action.payload,
      };
    }

    default: {
      return state;
    }
  };
};
