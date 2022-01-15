import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";

const Product = ({ item }) => {
  return (
    <View>
      <Text>{item.brand} </Text>
    </View>
  );
};

export default Product;
