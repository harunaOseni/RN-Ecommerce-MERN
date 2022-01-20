import React, { useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import {
  VStack,
  Input,
  Button,
  IconButton,
  Icon,
  Text,
  NativeBaseProvider,
  Center,
  Box,
  Divider,
  Heading,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";

const data = require("../../assets/data/products.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
  }, []); //  [] means run once

  const handleSearch = (text) => {
    const productsFiltered = products.filter((product) =>
      product.name.toLowerCase().includes(text.toLowerCase())
    );
    setProductsFiltered(productsFiltered);
  };

  const openList = () => {
    setFocus(true);
  };

  const closeList = () => {
    setFocus(false);
  };

  return (
    <NativeBaseProvider>
      <Input
        placeholder="Search"
        variant="filled"
        width="100%"
        height={50}
        borderRadpanda
        style={{
          position: "relative",
          top: 55,
          marginBottom: 15,
          zIndex: 1,
          width: "95%",
          marginLeft: 10,
        }}
        onChangeText={(text) => handleSearch(text)}
        onFocus={openList}
      />
      {/* Icon for close search bar */}

      {focus ? (
        <Icon
          as={<Ionicons name="ios-close" size={20} />}
          style={{
            position: "absolute",
            top: 65,
            right: 10,
            zIndex: 1,
            color: "gray",
            fontSize: 30,
          }}
          onPress={closeList}
        />
      ) : null}

      {focus ? (
        <SearchedProducts productsFiltered={productsFiltered} />
      ) : (
        <View>
          <FlatList
            style={{ marginTop: 45 }}
            data={products}
            horizontal={false}
            numColumns={2}
            renderItem={({ item }) => <ProductList item={item} key={item.id} />}
            keyExtractor={(item) => item.name}
          />
        </View>
      )}
    </NativeBaseProvider>
  );
};

export default ProductContainer;
