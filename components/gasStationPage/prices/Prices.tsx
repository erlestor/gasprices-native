import { StyleSheet, View } from "react-native"
import { Card, Divider, Headline, Subheading, Title } from "react-native-paper"
import { GasPrice, GetGasStationData } from "../../../types"
import PricesGraph from "../pricesGraph/PricesGraph"
import { styles } from "./prices.style"

type Props = {
  data: GetGasStationData | undefined
}

export default function Prices({ data }: Props) {
  const prices = data?.gasStation.prices
  const latestPrices = prices?.slice(prices.length - 3, prices.length).reverse()
  console.log("latestPrices: ", latestPrices)

  return (
    <View style={styles.pricesWrapper}>
      <Headline>Siste priser</Headline>
      <PricesGraph data={data} />
      {latestPrices &&
        latestPrices.map((price, priceIdx) => (
          <Card key={priceIdx} style={styles.cardWrapper} elevation={1}>
            <Card.Content style={styles.cardContent}>
              <Subheading>{price.price.toFixed(2)} kr/l</Subheading>
              <Subheading>
                {new Date(price.createdAt).toLocaleDateString("no-NO", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Subheading>
            </Card.Content>
          </Card>
        ))}
    </View>
  )
}
