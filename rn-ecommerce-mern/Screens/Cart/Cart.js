import React from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";
import { Text, NativeBaseProvider } from "native-base";
import { connect } from "react-redux";
import * as actions from "../../Redux/Actions/cartActions";

const { width } = Dimensions.get("window");

const Cart = ({ cartItems }) => {
  return (
    <NativeBaseProvider>
      {cartItems.length ? (
        <View>
          <Text style={styles.title}>Cart</Text>
          <ScrollView>
            {cartItems.map((item) => {
              return (
                <TouchableOpacity style={styles.container}>
                  <View>
                    <Image
                      source={{
                        uri: item.product.image
                          ? item.product.image
                          : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                      }}
                      resizeMode="contain"
                      style={styles.image}
                    />
                  </View>
                  <View style={styles.subContainer}>
                    <Text style={styles.productName}>{item.product.name}</Text>
                    <Text style={styles.price}>
                      ${item.product.price.toFixed(2)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text>Looks like your cart is empty</Text>
          <Text>Add products to your cart to get started</Text>
        </View>
      )}
    </NativeBaseProvider>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

const styles = StyleSheet.create({
  emptyContainer: {
    height: "100%",
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    padding: 15,
  },
  container: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    padding: 10,
    alignItems: "center",
  },
  productName: {
    fontSize: 15,
    paddingBottom: 5,
  },
  price: {
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default connect(mapStateToProps)(Cart);
// export default Cart;
