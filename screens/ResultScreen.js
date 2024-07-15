import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { cardData, takenPhoto, confidence } = route.params;

  const handlePress = () => {
    Linking.openURL(cardData.card.link_marketplace);
  };

  const getConfidenceTextAndStyle = (confidence) => {
    if (confidence < 0.5) {
      return { confidenceText: "Low", confidenceStyle: styles.confidenceLow };
    } else if (confidence >= 0.5 && confidence < 0.8) {
      return {
        confidenceText: "Medium",
        confidenceStyle: styles.confidenceMedium,
      };
    } else {
      return { confidenceText: "High", confidenceStyle: styles.confidenceHigh };
    }
  };

  const { confidenceText, confidenceStyle } = getConfidenceTextAndStyle(
    parseFloat(confidence)
  );

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceTitle}>Confidence: </Text>
          <Text style={confidenceStyle}>{confidenceText}</Text>
        </View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
          style={styles.scrollView}
          bounces
        >
          <Image
            source={{ uri: "https://" + cardData.card.image }}
            style={styles.image}
          />
          <Image source={{ uri: takenPhoto }} style={styles.image} />
        </ScrollView>
        <View style={styles.infoContainer}>
          <Text style={styles.info}>{cardData.card.name}</Text>
          <Text style={styles.info}>{cardData.collection.name}</Text>
          <View style={styles.pricesContainer}>
            <Text style={styles.infoLowest}>
              R${cardData.card.lowest_price.toFixed(2)}
            </Text>
            <Text style={styles.info}>-</Text>
            <Text style={styles.infoHighest}>
              R$
              {cardData.card.highest_price.toFixed(2)}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <Button
              color="#eba410"
              title="Liga One Piece"
              onPress={handlePress}
            />
            <Button
              color="#6cb9df"
              title="Done"
              onPress={() => navigation.navigate("Home")}
            />
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.1,
  },
  container: {
    paddingVertical: 56,
    paddingHorizontal: 32,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  confidenceContainer: {
    flexDirection: "row",
    fontSize: 18,
    fontWeight: "bold",
  },
  confidenceTitle: {
    color: "#333",
  },
  confidenceLow: {
    color: "red",
  },
  confidenceMedium: {
    color: "orange",
  },
  confidenceHigh: {
    color: "green",
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
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    fontSize: 18,
  },
  infoLowest: {
    fontSize: 18,
    color: "green",
  },
  infoHighest: {
    fontSize: 18,
    color: "red",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
  scrollView: {
    marginTop: 24,
    width: "100%",
    height: 300,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain",
    margin: 10,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 36,
  },
  pricesContainer: {
    flexDirection: "row",
    gap: 16,
  },
});
