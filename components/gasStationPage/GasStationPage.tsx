import { ScrollView } from "react-native"
import { styles } from "./gasStationPage.style"
import { Headline, Subheading, Text } from "react-native-paper"
import { useQuery } from "@apollo/client"
import { GetGasStationData, RootStackParamList } from "../../types"
import { GET_GAS_STATION } from "../../graphql/queries.graphql"
import AddPrice from "./addPrice/AddPrice"
import Prices from "./prices/Prices"
import { RouteProp, useRoute } from "@react-navigation/native"

type FrontpageRouteProp = RouteProp<RootStackParamList, "GasStationPage">

export default function GasStationPage() {
  const route = useRoute<FrontpageRouteProp>()
  const { id } = route.params

  //The query that fetches the gas station with the given id
  const { error, loading, data, refetch } = useQuery<GetGasStationData>(
    GET_GAS_STATION,
    {
      variables: {
        id,
      },
    }
  )

  //The error message
  if (error) return <Headline>{error.message}</Headline>
  //Loading
  if (loading) return <Headline>Loading</Headline>

  const { name, city, latestPrice, prices } = data?.gasStation!

  return (
    <ScrollView style={styles.page}>
      <Text style={styles.name}>{name}</Text>
      <Subheading style={styles.city}>{city}</Subheading>
      <Prices data={data} />
      <AddPrice id={data?.gasStation.id!} refetch={refetch} />
    </ScrollView>
  )
}
