import { View, Text, StyleSheet } from "react-native";
import Header from "../../components/Header/Header";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheet";
import FormRegister from "../../components/FormRegister/FormRegister";
import { useNavigation, useRoute } from "@react-navigation/native";
function Register() {
  const navigation = useNavigation();
  const route = useRoute();
  const { photo } = route.params;
  return (
    <View style={styles.container}>
      <Header title="Register FaceId" />
      <FormRegister style={styles.form} picture={photo} />
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
});

export default Register;
