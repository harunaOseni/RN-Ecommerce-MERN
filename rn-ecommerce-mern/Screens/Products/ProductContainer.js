import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
} from "react-native";
import ProductList from "./ProductList";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(data);
  }, []); //  [] means run once

  return (
    <View>
      <View>
        <FlatList
          style={{ marginTop: 50 }}
          data={products}
          horizontal={false}
          numColumns={2}
          renderItem={({ item }) => <ProductList item={item} key={item.id} />}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

export default ProductContainer;
