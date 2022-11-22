import { NativeStackScreenProps } from "@react-navigation/native-stack"

export interface GasPrice {
  id: string
  price: number
  createdAt: number
}

export interface GasStation {
  id: string
  name: string
  city: string
  latestPrice?: number
  prices?: GasPrice[]
}

export interface GetGasStationsData {
  gasStations: GasStation[]
}

export interface GetGasStationData {
  gasStation: GasStation
}

export interface Datapoint {
  name: string
  [key: string]: string | number
}

export interface GraphData {
  labels: string[]
  datasets: { data: number[]; strikeWidth?: number }[]
  legend: string[]
}

export type RootStackParamList = {
  Frontpage: undefined
  GasStationPage: { id: string }
}
