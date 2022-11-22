import { makeVar } from "@apollo/client";

export const limit = 24; // divisible by 2 and 3 to make sure the last row is full in the grid
export const hasMoreVar = makeVar<boolean>(true);
