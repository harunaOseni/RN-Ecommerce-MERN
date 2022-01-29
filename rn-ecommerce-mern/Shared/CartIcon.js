import React from "react";
import { StyleSheet } from "react-native";
import { Badge, Text } from "native-base";

import { connect } from "react-redux";

const CartIcon = ({ cartItems }) => {
  return (
    <>
      {cartItems.length > 0 ? (
        <Badge style={styles.badge}>
          <Text style={styles.badgeText}>{cartItems.length}</Text>
        </Badge>
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 20,
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    top: -1,
    right: -15,
    backgroundColor: "red",
    borderRadius: 30,
    height: 20,
  },

  badgeText: {
    fontSize: 13,
    width: 100,
    fontWeight: "bold",
    position: "relative",
    top: -3,
    right: -45,
  },
});

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartItems,
  };
};

export default connect(mapStateToProps)(CartIcon);
