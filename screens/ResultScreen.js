import React from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";

export default function ResultScreen({ route, navigation }) {
  const { photoUri } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Result</Text>
      <Image source={{ uri: photoUri }} style={styles.image} />
      <Text style={styles.info}>Nome: Monkey D. Luffy</Text>
      <Text style={styles.info}>Coleção: Romance Dawn</Text>
      <Text style={styles.info}>Preço: $100.00</Text>
      <Button title="Done" onPress={() => navigation.navigate("Home")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  image: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
    marginBottom: 20,
  },
  info: {
    fontSize: 18,
    marginBottom: 10,
  },
});
