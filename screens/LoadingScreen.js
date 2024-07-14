import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from "react-native";
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
          throw new Error("Classificação da carta falhou.");
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
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        Alert.alert("Erro", "Não foi possível classificar a carta.");
        navigation.navigate("Home");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigation, photoUri]);

  return (
    <View style={styles.container}>
      {loading ? (
        <>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Processando...</Text>
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
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
