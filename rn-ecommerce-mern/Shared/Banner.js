import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");

const Banner = ({ productsCtg }) => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://sportshub.cbsistatic.com/i/2021/12/17/90ee0e83-d9f6-4726-8ab9-925872d5ab42/cyberpunk-2077.png",
      "https://photos5.appleinsider.com/gallery/46552-90742-macbook-air-january-sale-xl.jpg",
      "https://cdn.mos.cms.futurecdn.net/KonJYD3ddiZF3E8GHU3MPi.jpg",
    ]);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            // if productsCtg is greater than 2 height ios 250 else height 20
            style={productsCtg.length > 2 ? { height: 320 } : { height: 200 }}
            showButtons={false}
            autoplay={true}
            autoplayTimeout={1}
          >
            {bannerData.map((item) => {
              return (
                <Image
                  key={item}
                  style={styles.imageBanner}
                  resizeMode="contain"
                  source={{ uri: item }}
                />
              );
            })}
          </Swiper>
          <View style={{ height: 9 }}></View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "gainsboro",
  },
  swiper: {
    width: width,
    alignItems: "center",
    marginTop: 10,
  },
  imageBanner: {
    height: width / 2,
    width: width - 40,
    borderRadius: 10,
    marginHorizontal: 20,
  },
});

export default Banner;
