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
import CategoryFilter from "./CategoryFilter";

const ProductContainer = () => {
  const data = require("../../assets/data/products.json");
  const Categories = require("../../assets/data/categories.json");
  const [products, setProducts] = useState([]);
  const [productsFiltered, setProductsFiltered] = useState([]);
  const [focus, setFocus] = useState(false);
  const [categories, setCategories] = useState([]);
  const [productsCtg, setProductsCtg] = useState([]);
  const [active, setActive] = useState();
  const [initialState, setInitialState] = useState([]);

  useEffect(() => {
    setProducts(data);
    setProductsFiltered(data);
    setFocus(false);
    setProductsCtg(data);
    setCategories(Categories);
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

  const handleChangeCtg = (ctg) => {
    {
      ctg === "all"
        ? [setProductsFiltered(initialState), setActive(true)]
        : [
            setProductsFiltered(
              productsCtg.filter((product) => product._id === ctg)
            ),
            setActive(true),
          ];
    }
  };

  return (
    <NativeBaseProvider>
      <View style={{ marginLeft: 10 }}>
        <Input
          placeholder="Search"
          variant="filled"
          width="97%"
          height={50}
          borderRadius={10}
          onChangeText={(text) => handleSearch(text)}
          onFocus={openList}
        />
      </View>
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
          <View>
            <CategoryFilter
              categories={categories}
              categoryFilter={handleChangeCtg}
              productsCtg={productsCtg}
              active={active}
              setActive={setActive}
            />
          </View>
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
