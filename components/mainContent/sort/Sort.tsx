import { useReactiveVar } from "@apollo/client"
import { Picker } from "@react-native-picker/picker"
import { View } from "react-native"
import { filterStateVar } from "../../../state/filterState"
import { styles } from "./sort.style"

/**
 * The different options for sorting
 */
export enum sortByOptions {
  priceASC = "latestPrice|ASC",
  priceDESC = "latestPrice|DESC",
  nameASC = "name|ASC",
  nameDESC = "name|DESC",
}

export default function Sort() {
  // Reactive variable for the filter state
  const filterState = useReactiveVar(filterStateVar)

  // Saves the filter option and direction
  const selectedFilterOption = (filterState.sortBy +
    "|" +
    filterState.sortDirection) as sortByOptions

  /**
   * @param e The chosen sort option
   * Retrieves the sort value and direction and passes it to the reactive variable
   */
  const handleSortChange = (value: string) => {
    const [sortBy, direction] = value.split("|")
    filterStateVar({
      ...filterStateVar(),
      sortBy: sortBy as "latestPrice" | "name",
      sortDirection: direction as "ASC" | "DESC",
    })
  }

  return (
    <View>
      <Picker
        selectedValue={selectedFilterOption}
        onValueChange={handleSortChange}
        style={styles.picker}
      >
        <Picker.Item
          label="Pris - lav til høy"
          value={sortByOptions.priceASC}
        />
        <Picker.Item
          label="Pris - høy til lav"
          value={sortByOptions.priceDESC}
        />
        <Picker.Item label="Navn - a til å" value={sortByOptions.nameASC} />
        <Picker.Item label="Navn - å til a" value={sortByOptions.nameDESC} />
      </Picker>
    </View>
  )
}
