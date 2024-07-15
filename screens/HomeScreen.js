import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  ImageBackground,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Button, Provider as PaperProvider } from "react-native-paper";

export default function HomeScreen() {
  const navigation = useNavigation();

  const openCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera permissions to make this work.");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [9, 16],
      quality: 1,
    });

    if (!result.canceled) {
      navigation.navigate("Loading", { photoUri: result.assets[0].uri });
    } else {
      console.log("Picture canceled.");
    }
  };

  return (
    <PaperProvider>
      <ImageBackground
        source={require("../assets/background.png")}
        style={styles.background}
        imageStyle={styles.backgroundImage}
      >
        <View style={styles.container}>
          <Text style={styles.title}>OPTCG Scanner</Text>
          <Button
            mode="contained"
            onPress={openCamera}
            contentStyle={styles.buttonContent}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            Scan Card
          </Button>
        </View>
      </ImageBackground>
    </PaperProvider>
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
    padding: 16,
    gap: 128,
  },
  title: {
    fontSize: 36,
    marginBottom: 40,
    fontWeight: "bold",
    fontFamily: Platform.OS === "ios" ? "AvenirNext-Bold" : "Roboto",
    color: "#333",
  },
  button: {
    borderRadius: 24,
    elevation: 3, // Android
    shadowColor: "#000", // iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: "80%",
  },
  buttonContent: {
    height: 50, // Altura do botão
  },
  buttonLabel: {
    fontSize: 18,
  },
});
