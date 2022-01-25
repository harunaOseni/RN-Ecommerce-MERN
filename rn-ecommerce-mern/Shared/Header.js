import React from "react";
import { StyleSheet, Image, SafeAreaView, View } from "react-native";

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Image
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMLjz9oNdnLXV0Q54FboHbViJeUQYOn5k8eNhta60EoE5Li9eayyv-UVtHow692YI4tBE&usqp=CAU",
        }}
        resizeMode="contain"
        style={styles.logo}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    marginBottom: 60,
  },
  logo: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 25,
  },
});

export default Header;
