import { gql } from "@apollo/client";

export const ADD_GAS_STATION = gql`
  mutation add_gas_station(
    $name: String!
    $city: String!
    $latestPrice: GasPrice
    $prices: [GasPrice]
  ) {
    addGasStation(
      name: $name
      city: $city
      latestPrice: $latestPrice
      price: $price
    ) {
      id
      name
      city
      latestPrice
      prices
    }
  }
`;

export const CREATE_GAS_PRICE = gql`
  mutation create_gas_price($gasStation: ID!, $price: Float!) {
    createGasPrice(gasStation: $gasStation, price: $price) {
      id
    }
  }
`;
