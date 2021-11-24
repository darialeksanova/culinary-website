import { Nutrient } from "./nutrient";

export type Recipe = {
  id: number;
  title: string;
  image: string;
  nutrients: Nutrient[];
};