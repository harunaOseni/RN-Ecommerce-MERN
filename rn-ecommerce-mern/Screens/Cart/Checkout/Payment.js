import React, { useState } from "react";
import { View } from "react-native";
import {
  Text,
  Container,
  Heading,
  Box,
  NativeBaseProvider,
  extendTheme,
  Radio,
} from "native-base";

const methods = [
  { name: "Cash on Delivery", value: 1 },
  { name: "Bank Transfer", value: 2 },
  { name: "Card Payment", value: 3 },
];

const paymentCards = [
  { name: "Wallet", value: 1 },
  { name: "Visa", value: 2 },
  { name: "Mastercard", value: 3 },
  { name: "Other", value: 4 },
];

const Payment = ({ route }) => {
  const order = route.params;

  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: {
          paddingLeft: 2,
        },
      },
    },
  });

  const [method, setMethod] = useState();
  const [card, setCard] = useState();
  return (
    <NativeBaseProvider theme={theme}>
      <Container>
        <Heading>Choose your payment method</Heading>
        <Radio.Group
          name="paymentMethod"
          value={method}
          onChange={(value) => setMethod(value)}
        >
          {methods.map((method) => (
            <Radio
              key={method.value}
              value={method.value}
              size="lg"
              style={{ paddingLeft: 20, marginLeft: 10, marginTop: 10 }}
            >
              <Text
                style={{
                  marginTop: 10,
                  width: "100%",
                  fontWeight: "bold",
                  marginLeft: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {method.name}
              </Text>
            </Radio>
          ))}
        </Radio.Group>
      </Container>
    </NativeBaseProvider>
  );
};

export default Payment;
