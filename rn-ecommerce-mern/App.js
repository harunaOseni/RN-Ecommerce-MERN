import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, LogBox } from "react-native";
import ProductContainer from "./Screens/Products/ProductContainer";
import { NavigationContainer } from "@react-navigation/native";
import Header from "./Shared/Header";
import Main from "./Navigators/Main";
import { Provider } from "react-redux";
import store from "./Redux/store";

LogBox.ignoreLogs(["Warning: ..."]);
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Header />
        <Main />
      </NavigationContainer>
    </Provider>
  );
}
