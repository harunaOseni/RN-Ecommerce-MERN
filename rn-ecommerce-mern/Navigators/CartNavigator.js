import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Cart from "../Screens/Cart/Cart";
import CheckoutNavigator from "../Navigators/CheckoutNavigator"

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
        component={CheckoutNavigator}
      />
    </stack.Navigator>
  );
};

const CartNavigator = () => {
  return <MyStack />;
};

export default CartNavigator;
