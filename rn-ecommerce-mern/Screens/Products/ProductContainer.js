import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import Product from "./Product";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, []); //  [] means run once

  return (
    <View>
      <Text>Product Containe</Text>
      <View>
        <FlatList
          style={{ marginTop: 100 }}
          horizontal
          data={products}
          numColumns={2}
          renderItem={({ item }) => <Product item={item} key={item.id} />}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

export default ProductContainer;
