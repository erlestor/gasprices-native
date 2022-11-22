import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
  cardWrapper: {
    marginVertical: 10,
    width: "100%",
  },
  cardContent: {
    height: 65,
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "nowrap",
  },
  img: {
    width: 35,
    height: 30,
    resizeMode: "center",
  },
  imageWrapper: {
    height: "100%",
    display: "flex",
    justifyContent: "center",
  },
  cardInformation: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  cardText: {
    marginLeft: 15,
  },
  price: {
    borderLeftColor: "#d6d6d6",
    borderLeftWidth: 1,
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  priceTxt: {
    display: "flex",
    flexWrap: "wrap",
    textAlign: "left",
    paddingRight: 25,
  },
})
