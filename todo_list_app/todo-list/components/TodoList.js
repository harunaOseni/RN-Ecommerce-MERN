import { Stylesheet, Text, View, Button } from "react-native";
import React, { useState } from "react";

const TodoList = () => {
  const [title, setTitle] = useState("Todo List");
  return (
    <View>
      <Text>{title}</Text>
      <Button title="Change Title" onPress={() => setTitle("My List")} />
    </View>
  );
};

export default TodoList;
