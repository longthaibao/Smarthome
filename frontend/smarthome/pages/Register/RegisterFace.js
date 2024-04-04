import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheet";
import FormRegister from "../../components/FormRegister/FormRegister";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@rneui/themed";
import CameraRegister from "../../components/CameraRegister/CameraRegister";

function RegisterFace() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Header title="Register FaceId" />
      <CameraRegister style={styles.camera} />
      <BottomSheetComponent active={2} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  form: {
    width: "100%",
  },
  camera: {
    width: "100%",
    height: 400,
  },
});

export default RegisterFace;
