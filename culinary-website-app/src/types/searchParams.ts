import { SearchFilterValue } from "./searchFilterValue";

export type SearchParams = {
  totalRecipes: number;
  searchInput: string;
  filters: SearchFilterValue;
};