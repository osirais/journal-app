import { Text, View, StyleSheet } from "react-native";

export default function AuthHome() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>🚧 Work in progress</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
  },
  text: {
    fontSize: 18,
    color: "#333"
  }
});
