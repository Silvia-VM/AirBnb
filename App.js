import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";

import AuthLoadingScreen from "./components/AuthLoadingScreen";
import SignInScreen from "./components/SignInScreen";
import HomeScreen from "./components/HomeScreen";
import RoomScreen from "./components/RoomScreen";
import TabNavigator from "./components/TabNavigator";
import MapScreen from "./components/MapScreen";

const AppStack = createStackNavigator({
  Tab: TabNavigator,
  Home: HomeScreen,
  Map: MapScreen,
  Room: RoomScreen
});
const AuthStack = createStackNavigator({ SignIn: SignInScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);
