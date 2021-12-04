export type RecipeFull = {
  id: number,
  title: string,
  readyInMinutes: number,
  servings: number,
  image: string;
  summary: string;
  analyzedInstructions: Instructions[] | [];
};

type Instructions = {
  steps: [{
    step: string;
  }];
};