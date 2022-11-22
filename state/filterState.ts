import { makeVar } from "@apollo/client";

export interface FilterOptions {
  city?: string;
  maxPrice: number;
  nameSearch: string;
  sortBy: "latestPrice" | "name";
  sortDirection: "ASC" | "DESC";
}

function getDefaultFilterState(): FilterOptions {
  return {
    city: undefined,
    maxPrice: 30,
    nameSearch: "",
    sortBy: "latestPrice",
    sortDirection: "ASC",
  };
}

export function resetFilterState() {
  filterStateVar(getDefaultFilterState());
}

export const filterStateVar = makeVar<FilterOptions>(getDefaultFilterState());
