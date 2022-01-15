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
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([
    "Board Meeting",
    "Ship New Product",
  ]);

  //Add Item Method
  const addTodo = () => {
    setTodos([...todos, text]);
    setText("");
  };

  //Delete Item Method
  const deleteTodo = (index) => {
    setTodos(todos.filter((todo, i) => i !== index));
  };

  return (
    <View style={{ width: "80%", marginBottom: 60 }}>
      <Text style={[styles.font, styles.align]}>{title}</Text>
      <ScrollView>
        {todos.map((todo, index) => (
          <Todo key={index} task={todo} index={index} deleteTodo={deleteTodo} />
        ))}
      </ScrollView>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setText(text)}
          value={text}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Task"
          onPress={() => {
            addTodo();
          }}
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
