export type DishIngredients = {
  ingredients: [
    {
      name: string;
      amount: {
        metric: {
          value: number;
          unit: string;
        };
      };
    },
  ];
};