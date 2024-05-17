import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import axios from "axios";

function Signin() {
  const navigation = useNavigation();
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const handleSubmit = async () => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    if (!email || !password) {
      alert("Please fill in all fields");
    } else {
      try {
        const response = await axios.post(process.env.EXPO_PUBLIC_BACKEND_URL + "/admin/login", {
          email: email,
          password: password,
        });
        if (response.data) {
          // res.status(400).json({ error: "Invalid Password" });
          if (response.data.error) {
            alert("Invalid Password");
          } else {
            alert("Login successful");
            navigation.navigate("Home");
          }
        } else {
          alert("Invalid credentials");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title1}>Sign In</Text>
        <Text>Enter your email and password to get into the app!</Text>
      </View>
      <View style={styles.actionSignin}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="tomas257@gmail.com"
            style={styles.email}
            onChangeText={onChangeEmail}
            value={email}
          />
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.email}
            secureTextEntry="true"
            onChangeText={onChangePassword}
            value={password}
          />
        </View>
        <TouchableOpacity>
          <Text style={styles.forgot}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
          <Text style={styles.contentButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
        <Text style={styles.textButton}>
          Here for the first time?
          <Text style={styles.registerButton}> Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "space-around",
  },
  title: {},
  title1: {
    fontSize: 30,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 20,
  },
  email: {
    width: 300,
    height: 50,
    backgroundColor: "transparent",
    borderColor: "rgba(1, 1, 1, 0.2)",
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
  },
  forgot: {
    color: "#FF0007",
  },
  actionSignin: {
    justifyContent: "space-between",
    height: 300,
  },
  buttonSubmit: {
    backgroundColor: "#397AFF",
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  contentButton: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    color: "#000000",
    fontSize: 16,
    marginBottom: 10,
    color: "rgba(1, 1, 1, 0.6)",
  },
  textButton: {
    fontSize: 18,
    fontWeight: "bold",
  },
  registerButton: {
    color: "rgba(152, 94, 225, 1)",
  },
});

export default Signin;
