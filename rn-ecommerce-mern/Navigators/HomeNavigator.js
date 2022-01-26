import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ProductContainer from "../Screens/Products/ProductContainer";
import SingleProduct from "../Screens/Products/SingleProduct";

const stack = createStackNavigator();

function MyStack() {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Home"
        component={ProductContainer}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Product Detail"
        component={SingleProduct}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
}

export default function HomeNavigator() {
  return <MyStack />;
}
