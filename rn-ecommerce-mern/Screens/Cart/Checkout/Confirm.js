import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import {
  Text,
  NativeBaseProvider,
  Container,
  Heading,
  FlatList,
  Avatar,
  Box,
  HStack,
  VStack,
  Spacer,
  Button,
} from "native-base";
import * as actions from "../../../Redux/Actions/cartActions";

import { connect } from "react-redux";

const { width } = Dimensions.get("window");

const Confirm = ({ cartItems, route, navigation, clearCart }) => {
  const order = route.params;

  const handleConfirm = () => {
    navigation.navigate("Cart", { order });
    clearCart();
  };
  return (
    <NativeBaseProvider>
      <Container>
        <Heading style={{ width: width, textAlign: "center" }}>
          <Text>Confirm Order</Text>
        </Heading>
      </Container>
      {order ? (
        <View style={styles.shippingDetails}>
          <Text style={{ fontWeight: "bold" }}>Shipping to:</Text>
          <View style={{ padding: 10 }}>
            <Text>Address: {order.order.order.shippingAddress}</Text>
            <Text>Address2: {order.order.order.shippingAddress2}</Text>
            <Text>City: {order.order.order.city}</Text>
            <Text>Zip Code: {order.order.order.zip}</Text>
            <Text>Country: {order.order.order.country}</Text>
          </View>
          <Text style={{ fontWeight: "bold" }}> Items: </Text>
          <View style={{ padding: 10 }}>
            <FlatList
              data={cartItems}
              renderItem={({ item }) => (
                <Box
                  borderBottomWidth="1"
                  _dark={{
                    borderColor: "gray.600",
                  }}
                  borderColor="coolGray.200"
                  pl="4"
                  pr="5"
                  py="2"
                >
                  <HStack space={3} justifyContent="space-between">
                    <Avatar
                      size="48px"
                      source={{
                        uri: item.product.image,
                      }}
                    />
                    <VStack alignSelf="center">
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.product.name.length > 7
                          ? item.product.name.slice(0, 7) + "..."
                          : item.product.name}
                      </Text>
                    </VStack>
                    <Spacer />
                    <Text
                      fontSize="xs"
                      _dark={{
                        color: "warmGray.50",
                      }}
                      color="coolGray.800"
                      alignSelf="center"
                    >
                      ${item.product.price.toFixed(2)}
                    </Text>
                  </HStack>
                </Box>
              )}
              keyExtractor={(item) => item.product.id}
            />
          </View>
        </View>
      ) : null}
      <Box alignItems="center" mb={3} mt={30}>
        <Button onPress={handleConfirm} size="lg">
          Confirm
        </Button>
      </Box>
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
  shippingDetails: {
    borderWidth: 2,
    borderColor: "red",
    alignItems: "center",
    width: "70%",
    padding: 10,
    marginLeft: 60,
    height: "75%",
  },
});

export default connect(mapStateToProps, actions)(Confirm);
