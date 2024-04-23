import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, CheckBox } from "@rneui/themed";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";

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
  const [name, setName] = React.useState("");
  const [ageMember, setAgeMember] = React.useState("");
  const [sex, setSex] = React.useState("");
  const [relationshipMember, setRelationshipMember] = React.useState("");
  const [selectedIndex, setIndex] = React.useState(0);

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("name", "Long");
      formData.append("age", 18);
      formData.append("relationship", "Father");
      formData.append("sex", "Male");
      formData.append("dateStart", "2024-04-09T08:00:00.000Z");
      formData.append("dateEnd", "2024-04-10T17:00:00.000Z");
      const image = await FileSystem.readAsStringAsync(picture.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      formData.append("file", image);
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
      console.log(formData);
      console.log(image);
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
          onChangeText={setAgeMember}
          data={age}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
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
            checked={selectedIndex === 0}
            onPress={() => setIndex(0)}
            checkedIcon="dot-circle-o"
            uncheckedIcon="circle-o"
            title="Men"
            style={styles.checkbox}
            containerStyle={{ backgroundColor: "transparent" }}
          />
          <CheckBox
            checked={selectedIndex === 1}
            onPress={() => setIndex(1)}
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
          onChangeText={setRelationshipMember}
          data={relationship}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
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
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
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
