import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductContainer from "../Screens/Products/ProductContainer";

const stack = createStackNavigator();

function MyStack() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Home"
        component={ProductContainer}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
