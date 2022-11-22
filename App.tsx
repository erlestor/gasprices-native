import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import ApolloWrapper from "./ApolloWrapper"
import Frontpage from "./components/frontpage/Frontpage"
import GasStationPage from "./components/gasStationPage/GasStationPage"
import Header from "./components/header/Header"
import { RootStackParamList } from "./types"

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function App() {
  return (
    <ApolloWrapper>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Frontpage">
          <Stack.Screen
            name="Frontpage"
            component={Frontpage}
            options={{ headerTitle: (props) => <Header /> }}
          />
          <Stack.Screen
            name="GasStationPage"
            component={GasStationPage}
            options={{ headerTitle: (props) => <Header /> }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloWrapper>
  )
}
