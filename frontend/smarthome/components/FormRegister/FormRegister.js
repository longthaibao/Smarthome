import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button, CheckBox } from "@rneui/themed";

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
  const [selectedIndex, setIndex] = React.useState(0);

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
          <TextInput placeholder="Enter your name" style={styles.inputName} />
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
        onPress={() => console.log(picture)}
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
