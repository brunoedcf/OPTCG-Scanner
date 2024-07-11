import React, { useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoadingScreen({ route }) {
  const navigation = useNavigation();
  const { photoUri } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Result", { photoUri });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, photoUri]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
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
