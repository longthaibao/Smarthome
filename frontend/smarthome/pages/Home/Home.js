import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";
import Header from "../../components/Header/Header.js";
import FamilyMember from "../../components/FamilyMember/FamilyMember.js";
import BottomSheetComponent from "../../components/BottomSheet/BottomSheet.js";
function Home() {
  const familyMember = {
    image: [
      {
        uri: "https://images.unsplash.com/photo-1620067925093-801122ac1408?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        uri: "https://images.unsplash.com/photo-1620067925093-801122ac1408?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        uri: "https://images.unsplash.com/photo-1620067925093-801122ac1408?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
      },
      {
        uri: "https://images.unsplash.com/photo-1620067925093-801122ac1408?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGhvdG8lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  };
  return (
    <View style={styles.container}>
      <Header title={"Home"} />
      <View style={styles.infoContainer}>
        <FamilyMember familyMember={familyMember} />
        <View style={styles.info}>
          <Text style={styles.titleAccess}>Latest access: </Text>
          <Text style={styles.titleAccess}>19:00, 01/01/2024</Text>
        </View>
        <Image source={familyMember.image[0]} style={styles.imageAccess} />
      </View>
      <View style={styles.bottomsheet}>
        <BottomSheetComponent />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E5E5E5",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  info: {
    flexDirection: "row",
    justifyContent: "center",
  },
  titleAccess: {
    color: "rgba(152, 94, 225, 1)",
    fontSize: 24,
  },
  infoContainer: {
    width: "100%",
    height: 600,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  imageAccess: {
    width: "90%",
    height: 350,
    borderRadius: "20%",
    objectFit: "fit",
  },
  bottomsheet: {
    width: "100%",
  },
});
export default Home;
