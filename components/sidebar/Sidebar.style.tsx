import { StyleSheet, Dimensions } from "react-native"

export const styles = StyleSheet.create({
  sideBar: {
    backgroundColor: "#fafafa",
    minHeight: Dimensions.get("window").height,
    zIndex: 10,
    elevation: 5,
    position: "absolute",
  },
  sideBarOpen: {
    paddingHorizontal: 35,
  },
  filterIcon: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  sideBarHeader: {
    paddingVertical: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sideBarSubHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    elevation: 1,
    backgroundColor: "black",
  },
  text: {
    fontSize: 13,
    lineHeight: 21,
    fontWeight: "600",
    letterSpacing: 0.25,
    color: "white",
  },
  radioBtnRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  citiesContainer: {
    marginVertical: 20,
  },
})
