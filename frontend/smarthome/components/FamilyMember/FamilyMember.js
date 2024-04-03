import { View, Image, StyleSheet, Text } from "react-native";

function FamilyMember({ familyMember }) {
  return (
    <View style={styles.container}>
      <Text style={{ color: "#FFFFFF", fontSize: 20 }}> Family members</Text>
      <View style={styles.listMember}>
        {familyMember.image.map((image, index) => (
          <View
            key={index}
            style={[styles.avatarWrapper, styles.overlappingAvatar]}
          >
            <Image source={image} style={styles.avatar} />
          </View>
        ))}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "90%",
    minHeight: 150,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "rgba(152, 94, 225, 1)",
    borderRadius: 22,
    padding: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    resizeMode: "fit",
    borderRadius: "50%",
  },
  listMember: {
    flexDirection: "row",
    width: "50%",
    backgroundColor: "transparent",
  },
  avatarWrapper: {
    position: "relative",
    zIndex: 1,
  },
  overlappingAvatar: {
    marginRight: -10,
  },
});
export default FamilyMember;
