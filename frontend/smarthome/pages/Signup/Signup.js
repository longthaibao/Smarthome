import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import {
  validateEmail,
  validatePassword,
  validatePincode,
} from "../../validators/validate.js";
import { CheckBox } from "react-native-elements";
import { useNavigation } from "@react-navigation/native";
function Signup() {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [pincode, onChangePincode] = useState("");
  const [checked, setChecked] = useState(false);
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [displayErrorEmail, setDisplayErrorEmail] = useState("none");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [displayErrorPassword, setDisplayErrorPassword] = useState("none");
  const [errorMessagePincode, setErrorMessagePincode] = useState("");
  const [displayErrorPincode, setDisplayErrorPincode] = useState("none");
  const navigation = useNavigation();
  const handleBlur = () => {
    const errors = validateEmail(email);
    const errorsPassword = validatePassword(password);
    const errorsPincode = validatePincode(pincode);
    if (errors.email) {
      setErrorMessageEmail(errors.email);
      setDisplayErrorEmail("flex");
    } else {
      setErrorMessageEmail("");
      setDisplayErrorEmail("none");
    }
    if (errorsPassword.password) {
      setErrorMessagePassword(errorsPassword.password);
      setDisplayErrorPassword("flex");
    } else {
      setErrorMessagePassword("");
      setDisplayErrorPassword("none");
    }
    if (errorsPincode.pincode) {
      setErrorMessagePincode(errorsPincode.pincode);
      setDisplayErrorPincode("flex");
    } else {
      setErrorMessagePincode("");
      setDisplayErrorPincode("none");
    }
  };
  const handleSubmit = () => {
    if (
      !errorMessageEmail &&
      !errorMessagePassword &&
      !errorMessagePincode &&
      checked
    ) {
      navigation.navigate("Home");
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title1}>Create Account</Text>
        <Text>Looks like you don’t have an account. Let’s create a new</Text>
        <Text>account for you.</Text>
      </View>
      <View style={styles.actionSignin}>
        <View>
          <Text style={styles.label}>Email</Text>
          <TextInput
            placeholder="tomas257@gmail.com"
            style={styles.email}
            onChangeText={onChangeEmail}
            value={email}
            onBlur={handleBlur}
            onFocus={() => {
              setDisplayErrorEmail("none");
              setErrorMessageEmail("");
            }}
          />
          <Text
            style={{
              display: displayErrorEmail,
              margin: 10,
              color: "rgba(242, 86, 86, 1)",
            }}
          >
            {errorMessageEmail}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Password</Text>
          <TextInput
            placeholder="Password"
            style={styles.email}
            secureTextEntry="true"
            onChangeText={onChangePassword}
            autoCompleteType="off"
            onBlur={handleBlur}
            onFocus={() => {
              setDisplayErrorPassword("none");
              setErrorMessagePassword("");
            }}
          />
          <Text
            style={{
              display: displayErrorPassword,
              margin: 10,
              color: "rgba(242, 86, 86, 1)",
            }}
          >
            {errorMessagePassword}
          </Text>
        </View>
        <View>
          <Text style={styles.label}>Pin Code</Text>
          <TextInput
            placeholder="Pin code"
            style={styles.email}
            secureTextEntry="true"
            onChangeText={onChangePincode}
            autoCompleteType="off"
            onBlur={handleBlur}
            onFocus={() => {
              setDisplayErrorPincode("none");
              setErrorMessagePincode("");
            }}
          />
          <Text
            style={{
              display: displayErrorPincode,
              margin: 10,
              color: "rgba(242, 86, 86, 1)",
            }}
          >
            {errorMessagePincode}
          </Text>
        </View>
        <TouchableOpacity>
          <CheckBox
            title="I accept terms & conditions"
            checked={checked}
            onPress={() => setChecked(!checked)}
            containerStyle={{ backgroundColor: "transparent", borderWidth: 0 }}
            textStyle={{ color: "rgba(242, 86, 86, 1)", fontWeight: "bold" }}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
        <Text style={styles.contentButton}>Sign Up</Text>
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
    minHeight: 400,
  },
  buttonSubmit: {
    backgroundColor: "#397AFF",
    width: 300,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 60,
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

export default Signup;
