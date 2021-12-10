export type PaginatedSearchResults<T> = {
  number: number;
  offset: number;
  results: T[];
  totalResults: number;
};