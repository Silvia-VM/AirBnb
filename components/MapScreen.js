import React from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { Constants, Location, Permissions } from "expo";
import { MapView } from "expo";

class MapScreen extends React.Component {
  state = {
    location: null,
    errorMessage: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Map"
    };
  };
  componentWillMount() {
    if (Platform.OS === "android" && !Constants.isDevice) {
      this.setState({
        errorMessage:
          "Oops, this will not work on Sketch in an Android emulator. Try it on your device!"
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied"
      });
    } else {
      const location = await Location.getCurrentPositionAsync({});
      this.setState({
        location: location
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    let text = "Waiting..";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
    }

    return (
      <MapView style={{ flex: 1 }}>
        <MapView.Marker
          coordinate={{
            latitude: 48.8564449,
            longitude: 2.4002913,
            latitudeDelta: 0.09,
            longitudeDelta: 0.04
          }}
          title={"Le Reacteur"}
          description={"La formation des champion·ne·s !"}
        />
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1"
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    textAlign: "center"
  }
});

export default MapScreen;
