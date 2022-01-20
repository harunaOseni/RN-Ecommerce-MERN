import React, { useState, useEffect } from "react";
import { Image, StyleSheet, Dimensions, View, ScrollView } from "react-native";
import Swiper from "react-native-swiper/src";

var { width } = Dimensions.get("window");

const Banner = () => {
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    setBannerData([
      "https://sportshub.cbsistatic.com/i/2021/12/17/90ee0e83-d9f6-4726-8ab9-925872d5ab42/cyberpunk-2077.png",
      "https://image.api.playstation.com/vulcan/img/cfn/1130723GMRPIhWzGsSAcZs1oN0LS95OAjs_X6q9eMUZC8JyAV5lPVqO1OmfjaH0p6SoO7MRk98adj_2xnaZec1cRLjkNehk8.png",
      "https://fanatics.frgimages.com/FFImage/thumb.aspx?i=/productimages/_3157000/altimages/ff_3157827alt1_full.jpg&w=900",
    ]);
  }, []);

  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <Swiper
            style={{ height: width / 1.2}}
            showButtons={true}
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
          <View style={{ height: 20 }}></View>
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
