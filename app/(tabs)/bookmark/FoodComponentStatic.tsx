import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { foodType } from "@/app/types";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
const { API_URL } = Constants.expoConfig?.extra;
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Constants from "expo-constants";
import { Post } from "@/app/services/api";
import icons from "@/app/constants/icons";
import InlineInfo from "../home/Info/InlineInfo";
const { height: ScreenHeight, width: screenWidth } = Dimensions.get("window");
const FoodComponentStatic = ({ food }: { food: foodType }) => {
  const heightAnimate = useSharedValue(100);
  const [infoStatus, setInfoStatus] = useState<boolean>(false);

  const infoStyle = {
    width: 40,
    height: 40,
    borderRadius: 100,
    marginRight: 20,
    margin: "auto",
  };
  const animation = useAnimatedStyle(() => {
    return {
      height: heightAnimate.value,
    };
  });

  function info() {
    setInfoStatus((prev: boolean) => !prev);
  }
  useEffect(() => {
    heightAnimate.value = withTiming(!infoStatus ? 100 : 150, {
      duration: 100,
    });
  }, [infoStatus]);

  return (
    <Animated.View
      style={[
        {
          zIndex: 0,
          position: "relative",
          width: "80%",
          marginVertical: 10,
        },
        animation,
      ]}
    >
      <TouchableOpacity
        onPress={info}
        style={{ ...styles.mainContainer, height: "100%" }}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image style={styles.image} source={icons.food} />
          </View>
          <View
            style={{
              ...styles.column,
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                maxWidth: 100,
              }}
            >
              {food.name}
            </Text>
            <Text style={{ fontSize: 10, fontWeight: "300" }}>
              {food.calories?.toFixed(1)} kcals
            </Text>
          </View>

          <View
            style={{
              ...styles.column,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                textAlign: "center",
                marginVertical: 5,
              }}
            >
              {food.servings}
            </Text>
          </View>
        </View>
        <InlineInfo
          protein={food.protein}
          carbs={food.carbs}
          calories={food.calories}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

export default FoodComponentStatic;

const styles = StyleSheet.create({
  servingBtn: {
    borderWidth: 1,
    width: 20,
    height: 20,
    padding: 3,
    borderRadius: 100,
  },
  mainContainer: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "flex-start",
    width: "100%",
    overflow: "hidden",
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  container: {
    padding: 15,
    marginTop: "0%",
    position: "relative",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    height: 100,
    overflow: "hidden",
  },
  spanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    flexDirection: "column",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageContainer: {
    width: 60,
    height: 60,
    padding: 10,
    borderRadius: 100,
    marginRight: 20,
  },
});
