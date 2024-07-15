import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

import { CLASSIFIER_API_URL, FASTAPI_URL } from "@env";

export default function LoadingScreen({ route }) {
  const navigation = useNavigation();
  const { photoUri } = route.params;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Chamar a API do Card Classifier
        const formData = new FormData();
        formData.append("file", {
          uri: photoUri,
          name: "photo.jpg",
          type: "image/jpeg",
        });

        const classifyResponse = await axios.post(
          CLASSIFIER_API_URL,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (!classifyResponse.data) {
          throw new Error("Card detection failed.");
        }

        // Chamar a API do FastAPI PyMongo para obter os detalhes da carta
        const cardResponse = await axios.get(
          `${FASTAPI_URL}${classifyResponse.data["class"]}`
        );

        console.log(cardResponse);

        console.log("\n\n");

        console.log(cardResponse.data);

        // Navegar para a tela de resultados com os dados da carta
        navigation.navigate("Result", {
          cardData: cardResponse.data,
          takenPhoto: photoUri,
          confidence: classifyResponse.data["confidence"],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Erro", "Card detection failed.");
        navigation.navigate("Home");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation, photoUri]);

  return (
    <ImageBackground
      source={require("../assets/background.png")}
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      <View style={styles.container}>
        {loading ? (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.loadingText}></Text>
          </>
        ) : null}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    opacity: 0.1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 20,
    fontSize: 18,
  },
});
