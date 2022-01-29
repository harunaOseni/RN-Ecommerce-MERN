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
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/FontAwesome";

const { width } = Dimensions.get("window");

const Cart = ({ cartItems, navigation, clearCart }) => {
  var totalPrice = 0;
  cartItems.forEach((item) => {
    totalPrice += item.quantity * item.product.price;
  });
  const handleClearCart = () => {
    clearCart();
  };
  return (
    <NativeBaseProvider>
      {cartItems.length ? (
        <View style={{ height: "100%", backgroundColor: "white" }}>
          <Text style={styles.title}>Cart</Text>
          <ScrollView>
            {cartItems.map((item) => {
              return (
                <SwipeListView
                  data={cartItems}
                  renderItem={({ item }) => (
                    <View style={styles.container}>
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
                        <Text style={styles.productName}>
                          {item.product.name}
                        </Text>
                        <Text style={styles.price}>
                          ${item.product.price.toFixed(2)}
                        </Text>
                      </View>
                    </View>
                  )}
                  renderHiddenItem={({ item }) => (
                    <View style={styles.hiddenContainer}>
                      <TouchableOpacity style={styles.hiddenButton}>
                        <Icon name="trash" color={"white"} size={30} />
                      </TouchableOpacity>
                    </View>
                  )}
                  disableRightswipe={true}
                  previewOpenLay={3000}
                  friction={40}
                  stopLeftSwipe={75}
                  rightOpenValue={-75}
                />
              );
            })}
          </ScrollView>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              position: "relative",
              bottom: 0,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                paddingTop: 5,
                color: "red",
              }}
            >
              ${totalPrice.toFixed(2)}
            </Text>
            <View
              style={{
                justifyContent: "space-around",
                justifyContent: "flex-end",
                width: "70%",
                flexDirection: "row",
              }}
            >
              <Button title="Clear" onPress={handleClearCart} />
              <Button
                title="Checkout"
                onPress={() => {
                  navigation.navigate("Checkout");
                }}
              />
            </View>
          </View>
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

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(actions.clearCart()),
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
    backgroundColor: "#eee",
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
  hiddenContainer: {
      flex: 1, 
      justifyContent: "flex-end",
      flexDirection: "row",
  }, 
  hiddenButton: {
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "flex-end", 
    paddingRight: 25,
    width: width / 1.2 
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
// export default Cart;
