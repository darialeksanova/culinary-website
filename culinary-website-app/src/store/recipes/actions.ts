import { LoadRecipesStartedAction, RecipesPreviewAction } from "./types";

export const startRecipesLoading = (): LoadRecipesStartedAction => {
  return {
    type: RecipesPreviewAction.LOAD_RECIPES_PREVIEW_STARTED,
  };
};