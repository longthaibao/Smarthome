import React from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, CheckBox } from "@rneui/themed";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { useNavigation } from "@react-navigation/native";

function FormRegister({ picture }) {
  const age = Array.from({ length: 100 - 18 + 1 }, (_, index) => index + 18);
  const relationship = [
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "GrandParent",
    "Other",
  ];
  const timeRegister = [10, 20, 30, 45];
  const [name, setName] = React.useState("");
  const [ageMember, setAgeMember] = React.useState(18);
  const [sex, setSex] = React.useState(true);
  const [relationshipMember, setRelationshipMember] = React.useState("");
  const [dateRegister, setDateRegister] = React.useState(0);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("age", ageMember);
      formData.append("relationship", relationshipMember);
      formData.append("sex", sex);
      const dateStart = new Date(Date.now()).toISOString().slice(0, 10);
      const temDateEnd = new Date(dateStart);
      temDateEnd.setTime(
        temDateEnd.getTime() + dateRegister * 24 * 60 * 60 * 1000
      );
      const dateEnd = temDateEnd.toISOString().slice(0, 10);
      formData.append("dateStart", dateStart);
      formData.append("dateEnd", dateEnd);
      let image = await FileSystem.readAsStringAsync(picture.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      image = `data:image/jpeg;base64,${image}`;
      formData.append("images", image);
      // Gửi yêu cầu POST lên server
      const response = await axios.post(
        "http://localhost:8080/member/register",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        alert("Register success");
        navigation.navigate("Home");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View style={styles.container}>
      <View>
        <Text style={{ fontSize: 20, marginLeft: 10 }}>Name</Text>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            alignItems: "center",
            width: "90%",
            backgroundColor: "#FFFFFF",
            borderRadius: 12,
            margin: 10,
          }}
        >
          <Ionicons
            name="information-circle-outline"
            size={30}
            color="#000000"
            backgroundColor="#FFFFFF"
          />
          <TextInput
            placeholder="Enter your name"
            style={styles.inputName}
            onChangeText={setName}
            value={name}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "90%",
        }}
      >
        <Text style={{ fontSize: 20, marginLeft: 10 }}>Age</Text>
        <SelectDropdown
          data={age}
          onSelect={(selectedItem, index) => setAgeMember(selectedItem)}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem || "Select your age"}
                </Text>
                <Ionicons
                  name={
                    isOpened ? "chevron-up-outline" : "chevron-down-outline"
                  }
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
      <View style={{ flexDirection: "column", width: "100%", marginLeft: 20 }}>
        <Text style={{ fontSize: 20, marginLeft: 20 }}>Sex</Text>
        <View>
          <CheckBox
            checked={sex === true}
            onPress={() => setSex(true)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Men"
            style={styles.checkbox}
            containerStyle={{ backgroundColor: "transparent" }}
          />
          <CheckBox
            checked={sex === false}
            onPress={() => setSex(false)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Women"
            style={styles.checkbox}
            containerStyle={{ backgroundColor: "transparent" }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "90%",
        }}
      >
        <Text style={{ fontSize: 20, marginLeft: 10 }}>Relationship</Text>
        <SelectDropdown
          onSelect={(selectedItem, index) =>
            setRelationshipMember(selectedItem)
          }
          data={relationship}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem || "Select relationship"}
                </Text>
                <Ionicons
                  name={
                    isOpened ? "chevron-up-outline" : "chevron-down-outline"
                  }
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text
                  onPress={setRelationshipMember(item)}
                  style={styles.dropdownItemTxtStyle}
                >
                  {item}
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "90%",
        }}
      >
        <Text style={{ fontSize: 20, marginLeft: 10 }}>
          Time register (day)
        </Text>
        <SelectDropdown
          onSelect={(selectedItem, index) => setDateRegister(selectedItem)}
          data={timeRegister}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {selectedItem || "Select relationship"}
                </Text>
                <Ionicons
                  name={
                    isOpened ? "chevron-up-outline" : "chevron-down-outline"
                  }
                  style={styles.dropdownButtonArrowStyle}
                />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View
                style={{
                  ...styles.dropdownItemStyle,
                  ...(isSelected && { backgroundColor: "#D2D9DF" }),
                }}
              >
                <Text
                  onPress={setDateRegister(item)}
                  style={styles.dropdownItemTxtStyle}
                >
                  {item}
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>
      <Button
        buttonStyle={{
          backgroundColor: "#FFFFFF",
          borderRadius: 10,
          width: 360,
          marginTop: 20,
        }}
        titleStyle={{ color: "black", fontWeight: "bold" }}
        onPress={handleSubmit}
      >
        Done
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  inputName: {
    width: "80%",
    height: 50,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    padding: 10,
    margin: 10,
  },
  selectAge: {
    width: "80%",
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    margin: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  checkbox: {
    width: "100%",
  },
});

export default FormRegister;
