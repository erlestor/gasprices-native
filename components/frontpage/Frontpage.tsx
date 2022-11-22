import { View } from "react-native"
import MainContent from "../mainContent/MainContent"
import Sidebar from "../sidebar/Sidebar"
import { styles } from "./frontPage.style"

export default function Frontpage() {
  return (
    <View style={styles.wrapper}>
      <Sidebar />
      <MainContent />
    </View>
  )
}
