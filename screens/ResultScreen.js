import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Image,
  Linking,
  ImageBackground,
  ScrollView,
  Dimensions,
} from "react-native";
import { format } from 'date-fns';

const { width } = Dimensions.get("window");

export default function ResultScreen({ route, navigation }) {
  const { cardDetails } = route.params;
  const [activeIndex, setActiveIndex] = useState(0);

  const onScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const activePage = Math.round(scrollPosition / width);
    setActiveIndex(activePage);
  };

  const handlePress = (link) => {
    Linking.openURL(link);
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

  const totalLowestPrice = cardDetails
    .reduce((sum, cardData) => sum + cardData.card.lowest_price, 0)
    .toFixed(2);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        disableIntervalMomentum
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {cardDetails.map((cardData, index) => (
          <View key={index} style={styles.container}>
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceTitle}>Confidence: </Text>
              <Text
                style={
                  getConfidenceTextAndStyle(parseFloat(cardData.confidence))
                    .confidenceStyle
                }
              >
                {
                  getConfidenceTextAndStyle(parseFloat(cardData.confidence))
                    .confidenceText
                }
              </Text>
            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: "https://" + cardData.card.image }}
                style={styles.image}
              />
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.info}>{cardData.card.name}</Text>
              <Text style={styles.info}>{cardData.collection.name}</Text>
              <Text style={styles.infoLastUpdated}>Last updated: {format(new Date(cardData.card.last_updated), 'yyyy/MM/dd HH:mm')}</Text>
              <View style={styles.pricesContainer}>
                <Text style={styles.infoLowest}>
                  R${cardData.card.lowest_price.toFixed(2)}
                </Text>
                <Text style={styles.info}>-</Text>
                <Text style={styles.infoHighest}>
                  R${cardData.card.highest_price.toFixed(2)}
                </Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button
                  color="#eba410"
                  title="Liga One Piece"
                  onPress={() => handlePress(cardData.card.link_marketplace)}
                />
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.pagination}>
        {cardDetails.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, { opacity: index === activeIndex ? 1 : 0.5 }]}
          />
        ))}
      </View>
      <View style={styles.cardSum}>
        <Text style={styles.info}>
          Total of {cardDetails.length}{" "}
          {cardDetails.length > 1 ? "cards" : "card"}:
        </Text>
        <Text style={styles.infoLowest}> R${totalLowestPrice}</Text>
      </View>
      <View style={styles.doneButton}>
        <Button
          color="#6cb9df"
          title="Done"
          onPress={() => navigation.navigate("Home")}
        />
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
  scrollContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    marginTop: 200,
    paddingVertical: 112,
    paddingHorizontal: 32,
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
    height: "100%",
    resizeMode: "contain",
  },
  infoContainer: {
    marginTop: 24,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    fontWeight: "bold",
    color: "#333",
  },
  info: {
    fontSize: 18,
  },
  infoLastUpdated: {
    fontSize: 12,
    opacity: 0.4,
    paddingBottom: 12,
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
    alignContent: "center",
    justifyContent: "center",
    gap: 36,
  },
  doneButton: {
    marginBottom: 32,
    alignContent: "center",
    marginHorizontal: 64,
  },
  pricesContainer: {
    flexDirection: "row",
    gap: 16,
  },
  cardSum: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 24,
  },
  dot: {
    height: 10,
    width: 10,
    backgroundColor: "#333",
    borderRadius: 5,
    marginHorizontal: 8,
  },
});
