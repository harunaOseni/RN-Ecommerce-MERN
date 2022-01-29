import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../Screens/Cart/Cart";
import Checkout from "../Screens/Cart/Checkout";

const stack = createStackNavigator();

const MyStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="Cart"
        component={Cart}
        options={{ headerShown: false }}
      />
      <stack.Screen
        name="Checkout"
        component={Checkout}
        options={{ headerShown: false }}
      />
    </stack.Navigator>
  );
};

const CartNavigator = () => {
  return <MyStack />;
};

export default CartNavigator;
