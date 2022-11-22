import { Dimensions } from "react-native"
import { LineChart } from "react-native-chart-kit"
import { GasPrice, GetGasStationData, GraphData } from "../../../types"
import { styles } from "./pricesGraph.style"

type Props = {
  data: GetGasStationData | undefined
}

export default function PricesGraph({ data }: Props) {
  const graphData: GraphData = {
    //   labels: ["January", "February", "March", "April", "May", "June"],
    labels: [],
    datasets: [
      {
        //   data: [20, 45, 28, 80, 99, 43],
        data: [],
      },
    ],
    legend: ["Pris (kr/l)"], // optional
  }

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: "#ffffff",
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `#4c2d80`,
  }

  /**
   * Formats the date for the graph
   * @param date The date to format
   * @returns The formated date
   */
  const formatDate = (date: Date) => {
    return (
      "" +
      date.getDate() +
      "/" +
      (date.getMonth() + 1) +
      "/" +
      date.getFullYear()
    )
  }

  /**Format the data so that it is compliant with recharts
   * @param data The data to format
   * @returns The formatted data
   */
  const getGraphData = (data: GetGasStationData) => {
    const prices = data.gasStation.prices!
    const latestPrices = prices.slice(prices.length - 3, prices.length)

    //Loop through the prices and format the dates.
    //Add the dates and prices to the graphData array
    latestPrices.forEach((price: GasPrice) => {
      const date = new Date(price.createdAt)
      const formattedDate = formatDate(date)
      const gasPrice = Number(price.price.toFixed(2))

      graphData.labels.push(formattedDate)

      graphData.datasets[0].data.push(gasPrice)
    })

    return graphData
  }
  return (
    <LineChart
      data={getGraphData(data!)}
      width={Dimensions.get("window").width - 60}
      height={220}
      chartConfig={chartConfig}
      bezier
    />
  )
}
