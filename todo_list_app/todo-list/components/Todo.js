import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";

const Todo = ({ task, deleteTodo, index }) => {
  return (
    <View style={styles.task}>
      <Text>{task}</Text>
      <Button
        title="Delete"
        onPress={() => {
          deleteTodo(index);
        }}
        color="red"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "whitesmoke",
    margin: 8,
    padding: 8,
  },
});

export default Todo;
