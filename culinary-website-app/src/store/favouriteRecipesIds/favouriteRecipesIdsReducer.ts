import { Reducer } from "redux";
import { FavouriteRecipesIdsAction, FavouriteRecipesIdsReducerAction, FavouriteRecipesIdsState } from "./types";

const initialState: FavouriteRecipesIdsState = {
  favouriteRecipesIds: [],
};

export const favouriteRecipesIdsReducer: Reducer<FavouriteRecipesIdsState, FavouriteRecipesIdsReducerAction> = (state = initialState, action) => {
  switch (action.type) {
    case FavouriteRecipesIdsAction.LOAD_FAVOURITE_RECIPES_IDS: {
      return {
        ...state,
        favouriteRecipesIds: action.payload,
      };
    }

    default: {
      return state;
    }
  };
};
