import { Text, View, TouchableOpacity, Animated, Easing } from "react-native"
import { useRef, useMemo, useState } from "react"
import Icon from "react-native-vector-icons/Ionicons"
import AntIcon from "react-native-vector-icons/AntDesign"
import { styles } from "./Sidebar.style"
import {
  Button,
  Divider,
  Headline,
  Paragraph,
  RadioButton,
  Subheading,
  Title,
} from "react-native-paper"
import { useReactiveVar } from "@apollo/client"
import { filterStateVar, resetFilterState } from "../../state/filterState"
import { debounce } from "../../service/debounce"
import Slider from "@react-native-community/slider"

export default function Sidebar() {
  const widthAnim = useRef(new Animated.Value(50)).current
  const opacityAnim = useRef(new Animated.Value(1)).current

  const [collapsed, setCollapsed] = useState(true)

  // Reactive variable which tracks filter state
  const filterState = useReactiveVar(filterStateVar)

  // used to display slider's current value
  const [maxPriceSliderValue, setMaxPriceSliderValue] = useState<number>(
    filterState.maxPrice
  )

  /**
   * Update the reactive variable which tracks filter state with the new max price
   * Function has a delay of 100ms, so that it does not spam the server with requests
   */
  const updateDebouncePrice = useMemo(
    () =>
      debounce((price: number) => {
        filterStateVar({
          ...filterStateVar(),
          maxPrice: price,
        })
      }, 100),
    []
  )

  /**
   *
   * @param event The event of changing the value of the slider
   * Passes the value given from the event as a float to update debounce price
   */
  const handlePriceSliderChange = (value: number) => {
    setMaxPriceSliderValue(value)
    updateDebouncePrice(value)
  }

  /**
   *
   * @param e The event of clicking a radio button
   * Retrieves if the radiobutton is checked or not and the city related to the radiobutton
   * If the radiobutton is checked, update the reactive variable that tracks filter state
   * @returns
   */
  const handleCityChange = (checked: boolean, city: string) => {
    filterStateVar({
      ...filterStateVar(),
      city: checked ? city : undefined,
    })
  }

  /**
   * Resets the state of the sidebar filter
   */
  const clearFilter = () => {
    resetFilterState()
    setMaxPriceSliderValue(filterStateVar().maxPrice)
  }

  // changes width of sidebar with animation
  const changeWidth = () => {
    const newWidth = collapsed === true ? 300 : 50

    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.back(0.5),
        duration: 10,
      }),
      Animated.parallel([
        // after decay, in parallel:

        Animated.timing(widthAnim, {
          toValue: newWidth,
          useNativeDriver: false,
          duration: 500,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1,
          useNativeDriver: false,
          easing: Easing.back(0.5),
          duration: 500,
        }),
      ]),
    ]).start()
  }

  const closeSidebar = () => {
    changeWidth()
    setCollapsed(true)
  }

  const openSidebar = () => {
    changeWidth()
    setCollapsed(false)
  }

  return (
    <View
      style={[
        styles.sideBar,
        collapsed ? {} : styles.sideBarOpen,
        { width: collapsed ? 50 : 300 },
      ]}
    >
      <View>
        {collapsed ? (
          <TouchableOpacity onPress={openSidebar}>
            <Icon name="filter" size={30} style={styles.filterIcon} />
          </TouchableOpacity>
        ) : (
          <View>
            <TouchableOpacity onPress={closeSidebar}>
              <View style={styles.sideBarHeader}>
                <Headline>Filtre</Headline>
                <AntIcon name="caretleft" size={17} />
              </View>
            </TouchableOpacity>
            <Divider />
            <View style={styles.sideBarSubHeader}>
              <Subheading>Filtrer etter</Subheading>
              <Button style={styles.button} onPress={clearFilter}>
                <Text style={styles.text}>Tøm</Text>
              </Button>
            </View>
            <View style={styles.citiesContainer}>
              <Subheading>By</Subheading>
              {cities.map((city, cityIdx) => (
                <View style={styles.radioBtnRow} key={cityIdx}>
                  <Paragraph>{city}</Paragraph>
                  <RadioButton
                    value={city}
                    status={filterState.city === city ? "checked" : "unchecked"}
                    onPress={() =>
                      handleCityChange(
                        filterState.city === city ? false : true,
                        city
                      )
                    }
                    color="#523ee8"
                  />
                </View>
              ))}
            </View>
            <View>
              <Subheading>Maks pris</Subheading>
              <Paragraph>{maxPriceSliderValue} kr</Paragraph>
              <Slider
                value={maxPriceSliderValue}
                minimumValue={10}
                maximumValue={30}
                onValueChange={handlePriceSliderChange}
                step={1}
                minimumTrackTintColor="#523ee8"
                maximumTrackTintColor="gray"
                thumbTintColor="#523ee8"
              />
            </View>
          </View>
        )}
      </View>
    </View>
  )
}

// The cities available for filtering
const cities = [
  "Oslo",
  "Trondheim",
  "Bergen",
  "Stavanger",
  "Kristiansand",
  "Tromsø",
]
