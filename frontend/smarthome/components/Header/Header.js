import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Vector from "../../assets/Vector.png";
import { useNavigation } from "@react-navigation/native";

function Header({ title }) {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('adminId');
      navigation.navigate("Onboarding");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>{title}</Text>
      <View style={styles.logo}>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons
            name="logo-electron"
            size={32}
            color="#8e44ad"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 80,
  },
  logo: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
    marginRight: 25,
    backgroundImage: `url(${Vector})`,
  },
  headerTitle: {
    fontSize: 35,
    color: "rgba(152, 94, 225, 1)",
    marginLeft: 25,
  },
});

export default Header;
