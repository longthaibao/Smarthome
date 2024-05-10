import { Image, StyleSheet, Text, View } from "react-native";
import Header from "../../components/Header/Header";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheet";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Button } from "@rneui/themed";
import axios from "axios";
import Toast from "react-native-toast-message";

function OpenDoor() {
  const image = [
    {
      uri: "https://images.unsplash.com/photo-1620067925093-801122ac1408?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
    },
  ];
  const handleOpenDoor = async () => {
    try {
      // Gửi yêu cầu POST lên server
      const response = await axios.get("http://localhost:8080/IOT/open");
      if (response.status === 200) {
        showToast();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const showToast = () => {
    Toast.show({
      type: "success",
      position: "top",
      topOffset: 200,
      text1: "Open Door Successfully!",
    });
  };
  return (
    <View style={styles.container}>
      <Header title={"Open Door"} />
      <Toast />
      <View style={styles.wrapperImage}>
        <Image source={image[0]} style={styles.image} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <Ionicons name="warning-outline" size={30} color="red" />
          <Text style={styles.warning}>
            Warning: Do not open the door if you are not sure who is behind it!
          </Text>
        </View>
        <Button
          type="outline"
          buttonStyle={{
            borderRadius: 10,
            margin: 20,
            borderColor: "rgb(250, 173, 20)",
          }}
          titleStyle={{ color: "rgb(250, 173, 20)", fontWeight: "bold" }}
          onPress={handleOpenDoor}
        >
          Open Door
        </Button>
      </View>
      <BottomSheetComponent active={3} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    justifyContent: "space-between",
  },
  wrapperImage: {
    width: "80%",
    height: 350,
    alignSelf: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 12,
  },
  warning: {
    textAlign: "center",
    margin: 10,
    color: "red",
    fontWeight: "bold",
  },
});

export default OpenDoor;
