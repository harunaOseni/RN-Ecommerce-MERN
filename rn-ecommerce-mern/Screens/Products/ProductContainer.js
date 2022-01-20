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
import { Ionicons } from "@expo/vector-icons";
import ProductList from "./ProductList";
import SearchedProducts from "./SearchedProducts";
import Banner from "../../Shared/Banner";

const data = require("../../assets/data/products.json");
const categories = require("../../assets/data/categories.json");

const ProductContainer = () => {
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setCategories(categories);
    setActive(-1);
    setInitialState(data);
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
        height={50}
        borderRadius={10}
        onChangeText={(text) => handleSearch(text)}
        onFocus={openList}
      />
      {/* Icon for close search bar */}

      {focus ? (
        <Icon
          as={<Ionicons name="ios-close" size={20} />}
          style={{
            position: "absolute",
            top: 10,
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
        <View style={{ marginTop: 10 }}>
          <Banner />
          <FlatList
            style={{ marginBottom: 590 }}
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
