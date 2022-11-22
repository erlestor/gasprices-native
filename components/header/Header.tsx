import { View } from "react-native"
import { Title } from "react-native-paper"
import Icon from "react-native-vector-icons/FontAwesome5"
import { styles } from "./header.style"

export default function Header() {
  return (
    <View style={styles.header}>
      <Icon name="gas-pump" size={30} style={styles.pumpIcon} />
      <Title>DrivstoffNettsiden</Title>
    </View>
  )
}
