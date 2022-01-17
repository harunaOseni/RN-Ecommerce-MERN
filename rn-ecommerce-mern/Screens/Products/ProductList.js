import React from "react";
import { TouchableOpacity, View, Text, Dimensions } from "react-native";
import ProductCard from "./ProductCard";

const { width } = Dimensions.get("window");

const ProductList = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={{ width: width / 2, backgroundColor: "gainsboro" }}>
        <ProductCard item={item}/>
      </View>
    </TouchableOpacity>
  );
};

export default ProductList;
