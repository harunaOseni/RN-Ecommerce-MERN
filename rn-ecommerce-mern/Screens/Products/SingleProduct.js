import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  Button,
} from "react-native";
import { Left, Right, Container, H1, NativeBaseProvider } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const SingleProduct = ({ route, addItemToCart }) => {
  // route is an object that contains the params that we passed from the previous screen
  const [item, setItem] = useState(route.params.item); // route.params.item is the item that we passed from the previous screen
  const [availability, setAvailability] = useState("");

  return (
    <NativeBaseProvider>
      <ScrollView style={{ padding: 5 }}>
        <View>
          <Image
            source={{
              uri: item.image
                ? item.image
                : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
            }}
            resizeMode="contain"
            style={styles.image}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{item.name}</Text>
        </View>
        <View style={styles.brandContainer}>
          <Text style={styles.brand}>{item.brand}</Text>
        </View>
      </ScrollView>
      <View style={styles.priceAddContainer}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            color: "red",
            paddingTop: 5,
          }}
        >
          ${item.price}
        </Text>
        <View style={{ paddingBottom: 10 }}>
          <Button
            title="Add"
            onPress={() => {
              addItemToCart(item);
            }}
          />
        </View>
      </View>
    </NativeBaseProvider>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItemToCart: (product) =>
      dispatch(
        actions.addToCart({
          quantity: 1,
          product: product,
        })
      ),
  };
};

const styles = StyleSheet.create({
  imageContainer: {
    backgroundColor: "white",
    padding: 0,
    margin: 0,
  },
  image: {
    width: "100%",
    height: 250,
  },
  titleContainer: {
    alignItems: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  brandContainer: {
    alignItems: "center",
  },
  brand: {
    fontSize: 15,
    fontWeight: "bold",
  },
  priceAddContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    //move it to the bottom
    marginTop: 170,
  },
});

export default connect(null, mapDispatchToProps)(SingleProduct);
