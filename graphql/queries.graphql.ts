import { gql } from "@apollo/client";

export const GET_GAS_STATIONS = gql`
  query getGasStations(
    $maxPrice: Float
    $city: String
    $limit: Int
    $skip: Int
    $sortBy: String
    $sortDirection: String
    $nameSearch: String
  ) {
    gasStations(
      maxPrice: $maxPrice
      city: $city
      limit: $limit
      skip: $skip
      sortBy: $sortBy
      sortDirection: $sortDirection
      nameSearch: $nameSearch
    ) {
      id
      name
      city
      latestPrice
    }
  }
`;

export const GET_GAS_STATION = gql`
  query getGasStation($id: ID!) {
    gasStation(id: $id) {
      id
      name
      city
      latestPrice
      prices {
        id
        price
        createdAt
      }
    }
  }
`;
