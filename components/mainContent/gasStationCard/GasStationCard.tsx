import { Image, View, TouchableOpacity, Text } from "react-native"
import {
  Caption,
  Card,
  Divider,
  Headline,
  Paragraph,
  Subheading,
  Title,
} from "react-native-paper"
import { GasStation, RootStackParamList } from "../../../types"
import { styles } from "./gasStationCard.style"
import { Images } from "../../../service/image"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

type Props = {
  gasStation: GasStation
}

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "Frontpage"
>

export default function GasStationCard({ gasStation }: Props) {
  const navigation = useNavigation<ProfileScreenNavigationProp>()

  const { id, name, city, latestPrice } = gasStation

  const handleCardClick = () => {
    navigation.navigate("GasStationPage", { id })
  }

  const Logo = Images.GetImage(name)

  return (
    // turn to touchable opacity
    <TouchableOpacity onPress={handleCardClick}>
      <Card elevation={3} style={styles.cardWrapper}>
        <Card.Content style={styles.cardContent}>
          <View style={styles.imageWrapper}>
            <Image source={Logo} style={styles.img} />
          </View>
          <View style={styles.cardInformation}>
            <View style={styles.cardText}>
              <Paragraph>{name}</Paragraph>
              <Caption>{city}</Caption>
            </View>
            <View style={styles.price}>
              <Subheading style={styles.priceTxt}>
                {latestPrice?.toFixed(2)} kr/l
              </Subheading>
            </View>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  )
}
