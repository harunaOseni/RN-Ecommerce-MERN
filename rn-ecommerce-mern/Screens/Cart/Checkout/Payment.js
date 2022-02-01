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
  Select,
  Button,
} from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";

const Payment = ({ route, navigation }) => {
  const order = route.params;

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

  const theme = extendTheme({
    components: {
      Heading: {
        baseStyle: {
          paddingLeft: 2,
        },
      },
      Select: {
        baseStyle: {
          borderWidth: 3,
          // borderColor: "#ffff00",
          borderRadius: 7,
          paddingTop: 3,
          paddingBottom: 3,
          backgroundColor: "white",
          marginLeft: 2,
        },
      },
    },
  });

  const [method, setMethod] = useState();
  const [card, setCard] = useState();

  const handlePayment = () => {
    navigation.navigate("Confirm", { order });
  };
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
        <Select
          selectedValue={card}
          minWidth={200}
          mt={2}
          placeholder="Select your card"
          onValueChange={(value) => setCard(value)}
          endIcon={<Icon name="arrow-down" size={15} />}
        >
          {paymentCards.map((paymentCard) => (
            <Select.Item
              key={paymentCard.value}
              label={paymentCard.name}
              value={paymentCard.value}
            />
          ))}
        </Select>
      </Container>
      <Box alignItems="center" ml={250} mb={3} mt={155}>
        <Button onPress={handlePayment} size="lg">
          Confirm
        </Button>
      </Box>
    </NativeBaseProvider>
  );
};

export default Payment;
