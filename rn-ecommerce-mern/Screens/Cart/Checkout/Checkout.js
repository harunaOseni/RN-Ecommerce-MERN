import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  Select,
  NativeBaseProvider,
  extendTheme,
  Button,
  Box,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import FormContainer from "../../../Shared/Form/FormContainer";
import Input from "../../../Shared/Form/Input";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { connect } from "react-redux";

const countries = require("../../../assets/data/countries.json");

const Checkout = ({ cartItems, navigation }) => {
  const theme = extendTheme({
    components: {
      Select: {
        baseStyle: {
          borderWidth: 3,
          borderColor: "#ffff00",
          borderRadius: 7,
          paddingTop: 5,
          paddingBottom: 5,
        },
      },
    },
  });

  const [orderItems, setOrderItems] = useState();
  const [address, setAddress] = useState();
  const [address2, setAddress2] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [country, setCountry] = useState();
  const [phone, setPhone] = useState();

  useEffect(() => {
    setOrderItems(cartItems);
  });

  const handleCheckout = () => {
    let order = {
      city,
      country,
      dateOrdered: new Date(),
      orderItems,
      phone,
      shippingAddress: address,
      shippingAddress2: address2,
      zip,
    };

    navigation.navigate("Payment", { order });
  };

  return (
    <NativeBaseProvider theme={theme}>
      <KeyboardAwareScrollView
        viewIsInsideTabBar={true}
        extraHeight={200}
        enableOnAndroid={true}
      >
        <FormContainer title={"Shipping Address"}>
          <Input
            placeholder={"Phone"}
            name={"phone"}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            keyboardType={"numeric"}
          />
          <Input
            placeholder={"Shipping Address"}
            name={"ShippingAddress1"}
            value={address}
            onChangeText={(text) => setAddress(text)}
          />
          <Input
            placeholder={"Shipping Address 2"}
            name={"ShippingAddress2"}
            value={address2}
            onChangeText={(text) => setAddress2(text)}
          />
          <Input
            placeholder={"City"}
            name={"city"}
            value={city}
            onChangeText={(text) => setCity(text)}
          />
          <Input
            placeholder={"Zip"}
            name={"zip"}
            value={zip}
            keyboardType={"numeric"}
            onChangeText={(text) => setZip(text)}
          />

          <Select
            selectedValue={country}
            minWidth={174}
            mt={2}
            placeholder="Select your country"
            onValueChange={(itemValue) => setCountry(itemValue)}
            endIcon={<Icon name="arrow-down" size={15} />}
          >
            {countries.map((country) => (
              <Select.Item
                key={country.code}
                label={country.name}
                value={country.code}
              />
            ))}
          </Select>
        </FormContainer>
      </KeyboardAwareScrollView>
      <Box alignItems="center" ml={200} mb={3} mt={3}>
        <Button onPress={() => handleCheckout} size="lg">
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

export default connect(mapStateToProps)(Checkout);
