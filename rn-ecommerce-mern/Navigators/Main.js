import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import { NativeBaseProvider } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import HomeNavigator from "../Navigators/HomeNavigator";
import CartNavigator from "../Navigators/CartNavigator";
import CartIcon from "../Shared/CartIcon";

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        keyboardHidesTabBar: true,
        showLabel: false,
        activeTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="home"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <NativeBaseProvider>
              <Icon
                name="shopping-cart"
                style={{ position: "relative" }}
                color={color}
                size={30}
              />
              <CartIcon />
            </NativeBaseProvider>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Admin"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="cog"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="User"
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon
              name="user"
              style={{ position: "relative" }}
              color={color}
              size={30}
            />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default Main;
