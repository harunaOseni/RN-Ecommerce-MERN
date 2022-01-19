import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import ProductContainer from "./Screens/Products/ProductContainer";
import Header from "./Shared/Header";

export default function App() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={{ marginBottom: 70 }}>
        <ProductContainer />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
