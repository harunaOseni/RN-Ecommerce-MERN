import React from "react";
import { StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { List, Badge, Text } from "native-base";

const CategoryFilter = ({
  categories,
  categoryFilter,
  productsCtg,
  active,
  setActive,
}) => {
  return (
    <ScrollView
      bounces={true}
      horizontal={true}
      style={{ backgroundColor: "#f2f2f2" }}
    >
      <TouchableOpacity
        key={1}
        onPress={() => {
          categoryFilter("all");
          setActive(-1);
        }}
      >
        <Badge
          style={[
            styles.center,
            { margin: 5 },
            active == -1
              ? { backgroundColor: "#03bafc" }
              : { backgroundColor: "#a0e1eb" },
          ]}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>All</Text>
        </Badge>
      </TouchableOpacity>
      {categories.map((category) => (
        <TouchableOpacity
          key={category._id}
          onPress={() => {
            categoryFilter(category._id.$oid);
            setActive(categories.indexOf(category));
          }}
        >
          <Badge
            style={[
              styles.center,
              { margin: 5 },
              active == categories.indexOf(category)
                ? { backgroundColor: "#03bafc" }
                : { backgroundColor: "#a0e1eb" },
            ]}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {category.name}
            </Text>
          </Badge>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    height: 30,
    width: 100,
  },
});

export default CategoryFilter;
