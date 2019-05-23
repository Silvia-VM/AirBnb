import React from "react";
import axios from "axios";
import { MapView } from "expo";
import { StyleSheet, Text, View, Image, ImageBackground } from "react-native";
import MapScreen from "./MapScreen";
class RoomScreen extends React.Component {
  state = {
    data: null
  };

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Room"
    };
  };

  render() {
    console.log(this.props.navigation.state.params.id);
    if (this.state.data !== null) {
      return (
        <View>
          <Text>{this.props.navigation.state.params.id}</Text>
          <ImageBackground
            source={{ uri: this.state.data.photos[0] }}
            style={{ height: 300, width: "100%", marginBottom: 15 }}
          >
            <Text
              style={{
                fontSize: 20,
                color: "white",
                backgroundColor: "black",
                padding: 20,
                position: "absolute",
                bottom: 45,
                left: 0
              }}
            >
              {this.state.data.price} €
            </Text>
          </ImageBackground>
          <Text
            style={{
              backgroundColor: "#FF5A61",
              width: 375,
              textAlign: "center",
              fontSize: 15,
              color: "white",
              fontWeight: "bold"
            }}
          >
            {this.state.data.title}
            <Image
              source={{ uri: this.state.data.user.account.photos[0] }}
              style={{ height: 60, width: 60, borderRadius: 30 }}
            />
          </Text>
          <Text numberOfLines={2} style={{ marginTop: 20, fontSize: 15 }}>
            {this.state.data.description}
          </Text>
          <MapScreen />

          <View />
        </View>
      );
    } else {
      return <Text>Loading...</Text>;
    }
  }
  async componentDidMount() {
    const response = await axios.get(
      "https://airbnb-api.now.sh/api/room/" +
        this.props.navigation.state.params.id
    );
    this.setState({
      data: response.data
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  }
});

export default RoomScreen;
