import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import ProductContainer from "./Screens/Products/ProductContainer";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./Shared/Header";
import Main from "./Navigators/Main";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <NavigationContainer>
      {/* <View style={styles.container}> */}
        <Header />
        {/* <View> */}
          <Main />
        {/* </View> */}
        {/* <StatusBar style="auto" />
      </View> */}
    </NavigationContainer>
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
