import { useQuery, useReactiveVar } from "@apollo/client"
import { Text, View, FlatList } from "react-native"
import { filterStateVar } from "../../state/filterState"
import SearchInput from "./searchInput/SearchInput"
import Sort from "./sort/Sort"
import {
  hasMoreVar as endlessScrollHasMoreElementsVar,
  limit,
} from "../../state/endlessScrollState"
import { GET_GAS_STATIONS } from "../../graphql/queries.graphql"
import { GetGasStationsData } from "../../types"
import { useEffect, useState } from "react"
import GasStationCard from "./gasStationCard/GasStationCard"
import { styles } from "./mainContent.style"

export default function MainContent() {
  // Reactive variable used to track filter state
  const filterState = useReactiveVar(filterStateVar)

  // Reactive variable which tracks if there are more elements to load
  const endlessScrollHasMoreElements = useReactiveVar(
    endlessScrollHasMoreElementsVar
  )

  const [page, setPage] = useState(1)

  /**
   * Fetches data from graphql server
   */
  const { error, loading, data, fetchMore } = useQuery<GetGasStationsData>(
    GET_GAS_STATIONS,
    {
      variables: {
        city: filterState.city,
        maxPrice: filterState.maxPrice,
        nameSearch: filterState.nameSearch,
        sortBy: filterState.sortBy,
        sortDirection: filterState.sortDirection,
        limit,
      },
    }
  )

  useEffect(() => {
    console.log(data)
  }, [data])

  useEffect(() => {
    endlessScrollHasMoreElementsVar(true)
  }, [filterState])

  function loadMoreData() {
    if (error || loading) return

    fetchMore({
      variables: {
        skip: data?.gasStations.length,
      },
    })
  }

  if (error) {
    console.log(error)
    return <Text>Error: {error.message}</Text>
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <View style={styles.inputs}>
          <SearchInput />
          <Sort />
        </View>
        {data && !loading ? (
          <FlatList
            style={styles.flatList}
            contentContainerStyle={styles.flatListContainer}
            data={data.gasStations}
            renderItem={({ item }) => <GasStationCard gasStation={item} />}
            refreshing={loading}
            onEndReached={loadMoreData}
          />
        ) : (
          <Text>Loading</Text>
        )}
      </View>
    </View>
  )
}
