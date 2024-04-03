import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheet";

function Register() {
  return (
    <View style={styles.container}>
      <Header title="Register FaceId" />
      <BottomSheetComponent />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
});

export default Register;
