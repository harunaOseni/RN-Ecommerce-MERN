import React from "react";
import { View, StyleSheet } from "react-native";
import { Content, Left, Body, ListItem, Thumbnail, Text } from "native-base";

const SearchedProducts = ({ productsFiltered }) => {
  return (
    <Content>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((product) => (
          <ListItem key={product.id}>
            <Left>
              <Thumbnail
                source={{
                  uri: product.image
                    ? item.image
                    : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                }}
              />
            </Left>
            <Body>
              <Text>{product.name}</Text>
              <Text note>{product.description}</Text>
            </Body>
          </ListItem>
        ))
      ) : (
        <View style={styles.center}>
          <Text style={{ alignSelf: "center" }}>
            No products match the selected criteria
          </Text>
        </View>
      )}
    </Content>
  );
};

const styles = StyleSheet.create({
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SearchedProducts;
