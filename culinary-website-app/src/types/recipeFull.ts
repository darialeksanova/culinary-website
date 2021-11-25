export type RecipeFull = {
  id: number,
  title: string,
  readyInMinutes: number,
  servings: number,
  image: string;
  summary: string;
  analyzedInstructions: [{
    steps: [{
      step: string;
    }];
  }];
  vegetarian: boolean;
  vegan: boolean;
  glutenFree: boolean;
  dairyFree: boolean;
};