import React from "react";
import { View, StyleSheet, Dimensions, Image, Text, ScrollView, TouchableOpacity } from "react-native";

const SearchedProducts = (props) => {
  const { width } = Dimensions.get("window");
  const { productsFiltered } = props;
  return (
    // <>
    //   {productsFiltered.length > 0 ? (
    //     productsFiltered.map((product) => (
    //       <ListItem key={product.id}>
    //         <Left>
    //           <Thumbnail
    //             source={{
    //               uri: product.image
    //                 ? product.image
    //                 : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
    //             }}
    //           />
    //         </Left>
    //         <View>
    //           <Text>{product.name}</Text>
    //           <Text note>{product.description}</Text>
    //         </View>
    //       </ListItem>
    //     ))
    //   ) : (
    //     <View style={styles.center}>
    //       <Text style={{ alignSelf: "center" }}>
    //         No products match the selected criteria
    //       </Text>
    //     </View>
    //   )}
    // </>
    <ScrollView style={{ marginTop: 30, marginBottom: -60 }}>
      {productsFiltered.length > 0 ? (
        productsFiltered.map((product) => (
          <TouchableOpacity>
          <View style={{ width: width }} key={product.id}>
            <View style={styles.listContainer}>
              <View>
                <Image
                  style={{ width: 100, height: 100, marginLeft: 10, borderRadius: 10 }}
                  source={{
                    uri: product.image
                      ? product.image
                      : "https://cdn.pixabay.com/photo/2012/04/01/17/29/box-23649_960_720.png",
                  }}
                />
              </View>
              <View style={{ justifyContent: "center", paddingLeft: 20 }}>
                <Text style={{fontWeight: "bold"}}>{product.name}</Text>
                <Text>{product.description}</Text>
                {/* horizontal line */}
              </View>
            </View>
            <View style={styles.line} />
          </View>
          </TouchableOpacity> 
        ))
      ) : (
        <Text>There's nothing here Alaye!</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    marginTop: 20,
    flexDirection: "row",
  },
  line: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    marginTop: 20,
  },
});

export default SearchedProducts;
