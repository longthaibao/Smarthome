import React, { useState } from "react";
import { BottomSheet, ListItem } from "@rneui/themed";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
function BottomSheetComponent({ active }) {
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
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.navigatorbottom}>
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => navigation.navigate("Home")}
        >
          <Feather
            name="home"
            size={28}
            color={active == 1 ? "#8e44ad" : "white"}
            style={styles.icon}
          />
          <Text style={[styles.title, active === 1 && styles.active]}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => navigation.navigate("RegisterFace")}
        >
          <Feather
            name="camera"
            size={28}
            color={active == 2 ? "#8e44ad" : "white"}
            style={styles.icon}
          />
          <Text style={[styles.title, active === 2 && styles.active]}>
            Register
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.wrapperIcon}
          onPress={() => navigation.navigate("OpenDoor")}
        >
          <Feather
            name="airplay"
            size={28}
            color={active == 3 ? "#8e44ad" : "white"}
            style={styles.icon}
          />
          <Text style={[styles.title, active === 3 && styles.active]}>
            Access
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapperIcon}>
          <Feather
            name="user"
            size={28}
            color={active == 4 ? "#8e44ad" : "white"}
            style={styles.icon}
          />
          <Text style={[styles.title, active === 4 && styles.active]}>
            Profile
          </Text>
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
    alignItems: "center",
  },
  title: {
    fontSize: 12,
    color: "white",
  },
  active: {
    color: "#8e44ad",
  },
});

export default BottomSheetComponent;
