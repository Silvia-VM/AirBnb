import React from "react";
import axios from "axios";

import {
  Button,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  Image,
  ImageBackground,
  item
} from "react-native";

class HomeScreen extends React.Component {
  state = {
    data: null
  };
  static navigationOptions = ({ navigation }) => {
    return {
      tabBarLabel: "MonAirbnb"
    };
  };

  render() {
    if (this.state.data === null) {
      return (
        <Text
          style={{
            color: "black",
            fontWeight: "bold"
          }}
        >
          is loading{" "}
        </Text>
      );
    }
    return (
      <View>
        <View>
          {/* <Button title="Aller sur une autre page" onPress={this.showMoreApp} /> */}
        </View>

        <Text>{this.state.data.title}</Text>
        <FlatList
          ItemSeparatorComponent={() => {
            return <View style={{ backgroundColor: "#FF5A61", height: 1 }} />;
          }}
          data={this.state.data}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => (
            <View>
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 17,
                  textAlign: "center",
                  backgroundColor: "#FF5A61"
                }}
              >
                {item.title}

                <Image
                  source={{ uri: item.user.account.photos[0] }}
                  style={{ height: 60, width: 60, borderRadius: 30 }}
                />
              </Text>
              <View>
                <TouchableOpacity
                  title="Aller sur une autre page"
                  onPress={() => {
                    this.showMoreApp(item._id);
                  }}
                >
                  <ImageBackground
                    source={{ uri: item.photos[0] }}
                    style={{ height: 200, width: "100%", marginBottom: 15 }}
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
                      {item.price} €
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      </View>
    );
  }

  showMoreApp = toto => {
    this.props.navigation.navigate("Room", { id: toto });
  };
  async componentDidMount() {
    const response1 = await axios.get(
      "https://airbnb-api.now.sh/api/room?city=paris"
    );
    this.setState({
      data: response1.data.rooms
    });
  }
}

export default HomeScreen;
