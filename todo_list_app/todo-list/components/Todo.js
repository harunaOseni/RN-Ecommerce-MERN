import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Todo = ({ task }) => {
  return (
    <View style={styles.task}>
      <Text>{task}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    task:{
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: "grey",
        borderWidth: 1,
        borderRadius: 5, 
        backgroundColor: "whitesmoke",
        margin: 8, 
        padding: 8,
    }
});

export default Todo;
