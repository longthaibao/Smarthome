import React, { useState } from "react";
import { BottomSheet, ListItem } from "@rneui/themed";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
function BottomSheetComponent() {
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    { title: "List Item 1" },
    { title: "List Item 2" },
    {
      title: "Cancel",
      containerStyle: { backgroundColor: "red" },
      titleStyle: { color: "white" },
      onPress: () => setIsVisible(false),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.navigatorbottom}>
        <TouchableOpacity style={styles.wrapperIcon}>
          <Feather name="home" size={27} color="#8e44ad" style={styles.icon} />
          <Text style={styles.title}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon}>
          <Feather name="camera" size={28} color="white" style={styles.icon} />
          <Text style={styles.title}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon}>
          <Feather name="airplay" size={28} color="white" style={styles.icon} />
          <Text style={styles.title}>Access</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon}>
          <Feather name="user" size={28} color="white" style={styles.icon} />
          <Text style={styles.title}>Profile</Text>
        </TouchableOpacity>
      </View>
      <BottomSheet modalProps={{}} isVisible={isVisible}>
        {list.map((l, i) => (
          <ListItem
            key={i}
            containerStyle={l.containerStyle}
            onPress={l.onPress}
          >
            <ListItem.Content>
              <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
            </ListItem.Content>
          </ListItem>
        ))}
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    margin: 10,
  },
  navigatorbottom: {
    width: "100%",
    backgroundColor: "#1E1E1E",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  icon: {
    height: 35,
    width: 35,
    marginBottom: 5,
  },
  wrapperIcon: {
    marginBottom: 40,
    marginTop: 20,
  },
  title: {
    color: "white",
    fontSize: 12,
  },
});

export default BottomSheetComponent;
