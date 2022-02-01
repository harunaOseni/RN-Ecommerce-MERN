import React from "react";
import { ScrollView, Dimensions, StyleSheet, Text } from "react-native";

var { width } = Dimensions.get("window");

const FormContainer = ({ title, children }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 400,
    width: width,
    alignItems: "center",
    height: 105
  },
  title: {
    fontSize: 30,
  },
});

export default FormContainer;
