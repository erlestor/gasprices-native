import { View } from "react-native"
import { useMemo, useState } from "react"
import { debounce } from "../../../service/debounce"
import { filterStateVar } from "../../../state/filterState"
import { Searchbar } from "react-native-paper"
import { styles } from "./searchInput.styles"

export default function SearchInput() {
  const [searchInputValue, setSearchInputValue] = useState<string>("")

  const updateDebounceText = useMemo(
    () =>
      debounce((text: string) => {
        filterStateVar({
          ...filterStateVar(),
          nameSearch: text,
        })
      }, 400),
    []
  )

  const handleSearchElChange = (text: string) => {
    updateDebounceText(text)
    setSearchInputValue(text)
  }

  return (
    <Searchbar
      style={styles.searchBar}
      placeholder="Søk"
      value={searchInputValue}
      onChangeText={handleSearchElChange}
    />
  )
}
