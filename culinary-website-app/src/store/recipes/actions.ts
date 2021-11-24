import { LoadRecipesStartedAction, RecipesAction } from "./types";

export const startRecipesLoading = (): LoadRecipesStartedAction => {
  return {
    type: RecipesAction.LOAD_RECIPES_STARTED,
  };
};