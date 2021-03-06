import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const SearchedProducts = ({ productsFiltered, navigation }) => {
  const { width } = Dimensions.get("window");
  const handleNavigateProductDetails = (product) => {
    navigation.navigate("Product Detail", { item: product });
  };
  return (
    <ScrollView style={{ marginTop: 5, marginBottom: 1 }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((product) => (
          <TouchableOpacity
            key={product.id}
            onPress={() => handleNavigateProductDetails(product)}
          >
            <View style={{ width: width }}>
              <View style={styles.listContainer}>
                <View>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      marginLeft: 10,
                      borderRadius: 10,
                    }}
                    source={{
                      uri: product.image
                        ? product.image
                        : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                    }}
                  />
                </View>
                <View style={{ justifyContent: "center", paddingLeft: 20 }}>
                  <Text style={{ fontWeight: "bold" }}>{product.name}</Text>
                  <Text>{product.description}</Text>
                  {/* horizontal line */}
                </View>
              </View>
              <View style={styles.line} />
            </View>
          </TouchableOpacity>
        ))
      ) : (
        <View style={{ width: width }}>
          <Text style={{ marginTop: 20, marginLeft: 10, fontWeight: "bold" }}>
            There's nothing here Alaye!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 5,
    flexDirection: "row",
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});

export default SearchedProducts;
