export type RecipeFull = {
  id: number,
  title: string,
  readyInMinutes: number,
  servings: number,
  image: string;
  summary: string;
  analyzedInstructions: Instructions[] | [];
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
};

type Instructions = {
  steps: [{
    step: string;
  }];
};