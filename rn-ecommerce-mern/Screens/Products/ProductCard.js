import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Button,
  Dimensions,
  Text,
} from "react-native";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";
const { width } = Dimensions.get("window");

const ProductCard = ({ item, addItemToCart }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{
          uri: item.image
            ? item.image
            : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
        }}
      />
      <View style={styles.card} />
      <Text style={styles.title}>
        {item.name.length > 15 ? item.name.substring(0, 15) + "..." : item.name}
      </Text>
      <Text style={styles.price}>${item.price.toFixed(2)}</Text>
      {item.countInStock > 0 ? (
        <Button
          color="green"
          title="Add"
          onPress={() => {
            addItemToCart(item);
          }}
        />
      ) : (
        <Text>Currently Unavailable</Text>
      )}
    </View>
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
  container: {
    width: width / 2 - 20,
    height: width / 1.7,
    padding: 10,
    borderRadius: 10,
    marginTop: 45,
    marginBottom: 15,
    marginLeft: 10,
    alignItems: "center",
    elevation: 8,
    backgroundColor: "white",
  },
  image: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 30,
    backgroundColor: "transparent",
    position: "absolute",
    top: -45,
  },
  card: {
    width: width / 2 - 20 - 10,
    height: width / 2 - 20 - 90,
    backgroundColor: "transparent",
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    color: "orange",
    marginTop: 10,
  },
});

export default connect(null, mapDispatchToProps)(ProductCard);
// export default ProductCard;
