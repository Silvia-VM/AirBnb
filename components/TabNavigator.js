import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import HomeScreen from "./HomeScreen";
import SettingsScreen from "./SettingsScreen";
import MapScreen from "./MapScreen";

import { Ionicons } from "@expo/vector-icons";

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Map: MapScreen,
    Settings: SettingsScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;

        switch (routeName) {
          case "Home":
            iconName = "ios-home";

            break;
          case "Map":
            iconName = "ios-map";

            break;
          case "Settings":
            iconName = "ios-settings";

            break;
          default:
            iconName = null;
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      }
    }),
    tabBarOptions: {
      activeTintColor: "tomato",
      inactiveTintColor: "gray"
    }
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  let headerTitle;

  switch (routeName) {
    case "Home":
      headerTitle = "MonAirbnb";
      break;
    case "Settings":
      headerTitle = "Paramètres";
      break;
    default:
      headerTitle = routeName;
  }

  return {
    headerTitle
  };
};

export default TabNavigator;
