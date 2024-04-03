import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import background from "../../assets/onboarding.png";
import title from "../../assets/title.png";

function Onboarding() {
  const navigation = useNavigation();
  return (
    <ImageBackground source={background} style={styles.image}>
      <View style={styles.onboarding1}>
        <Image source={title} />
      </View>
      <View style={styles.onboarding2}>
        <TouchableOpacity
          style={styles.buttonSignin}
          onPress={() => navigation.navigate("Signin")}
        >
          <Text style={styles.textButton}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonSignin2}
          onPress={() => console.log("Sign in")}
        >
          <Text style={styles.textButton}>
            Here for the first time?
            <Text style={styles.registerButton}> Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: "100%",
    resizeMode: "cover",
    alignItems: "center",
    justifyContent: "space-around",
  },
  onboarding1: {
    alignItems: "center",
  },
  onboarding2: {
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },

  buttonSignin: {
    width: "75%",
    height: 45,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  },
  buttonSignin2: {
    width: "75%",
    height: 45,
    display: "flex",
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 20,
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    color: "rgba(152, 94, 225, 1)",
  },
});

export default Onboarding;
