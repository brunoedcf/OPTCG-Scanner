import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
} from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { cardData, takenPhoto } = route.params;

  const handlePress = () => {
    Linking.openURL(cardData.link_marketplace);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado</Text>
      <View style={styles.photoContainer}>
        <Image source={{ uri: takenPhoto }} style={styles.image} />
        <Image
          source={{ uri: "https://" + cardData.image }}
          style={styles.image}
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.info}>{cardData.name}</Text>
        <Text style={styles.info}>
          R${cardData.lowest_price} - R${cardData.highest_price}
        </Text>
        <Button title="Done" onPress={() => navigation.navigate("Home")} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 56,
    marginHorizontal: 32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  photoContainer: {
    flex: 4,
    flexDirection: "row",

    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 24,
  },
  image: {
    flex: 1,
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  info: {
    fontSize: 18,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
