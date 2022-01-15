import {
  StyleSheet,
  Text,
  View,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import Todo from "./Todo";

const TodoList = () => {
  const [title, setTitle] = useState("Todo List");
  const [todos, setTodos] = useState([
    "Board Meeting",
    "Ship New Product",
    "Ring NASDAQ bell for initial Public Offering for company",
  ]);
  return (
    <View style={{ width: "80%", marginBottom: 60 }}>
      <Text style={[styles.font, styles.align]}>{title}</Text>
      <ScrollView>
        <Todo task="Board Meeting" />
        <Todo task="Ship new feature" />
        <Todo task="Ring NASDAQ bell for Initial Public Offering for company" />
      </ScrollView>
      <View>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Change Title"
          onPress={() => setTitle("My List")}
          color="black"
        />
      </View>
    </View>
  );
};

export default TodoList;

const styles = StyleSheet.create({
  font: {
    fontSize: 30,
    fontWeight: "bold",
  },
  align: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "blue",
  },
  buttonContainer: {
    padding: 5,
    backgroundColor: "grey",
    marginTop: 20,
    borderRadius: 10,
  },
  input: {
    borderRadius: 5,
    borderWidth: 3,
    marginBottom: 10,
    padding: 8,
  },
});
