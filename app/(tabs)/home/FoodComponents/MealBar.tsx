import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";

const MealBar = ({
  progress,
  progressColor,
  goal,
  goalColor,
  title,
  onPress,
}: {
  progress: number;
  progressColor: string;
  goal: number;
  goalColor: string;
  title: string;
  onPress: () => void;
}) => {
  const percentage = goal ? (progress / goal) * 100 : 0;
  const widthValue = useRef(new Animated.Value(0)).current;
  const widthAnimate = widthValue.interpolate({
    inputRange: [0, progress],
    outputRange: ["0%", `${percentage}%`],
  });
  useEffect(() => {
    Animated.timing(widthValue, {
      useNativeDriver: false,
      duration: 400,
      toValue: progress * 0.7,
    }).start();
    setTimeout(() => {
      Animated.timing(widthValue, {
        useNativeDriver: false,
        duration: 300,
        toValue: progress,
      }).start();
    }, 100);
  }, []);
  useEffect(() => {
    Animated.timing(widthValue, {
      useNativeDriver: false,
      duration: 1000,
      toValue: progress,
    }).start();
  }, [progress]);
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        ...styles.container,
        width: "100%",
        height: 40,
        overflow: "hidden",
      }}
    >
      <View style={styles.titleBar}>
        <Text style={{ textAlignVertical: "center", fontSize: 11 }}>
          {title}
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{ fontSize: 10, color: "#DDD", textAlignVertical: "center" }}
          >
            {goal - progress
              ? Math.abs(goal - progress).toFixed(2) + " g "
              : ""}
          </Text>
          <Text style={{ fontSize: 10, color: "#DDD" }}>
            {goal - progress > 0
              ? "Left"
              : goal - progress == 0
              ? "Perfect"
              : "Over"}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: "90%",
          height: "45%",
          backgroundColor: goalColor,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <Animated.View
          style={{
            ...styles.progress,
            width: widthAnimate,
            height: "100%",
            borderRadius: 10,
            backgroundColor: progressColor,
          }}
        ></Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(MealBar);

const styles = StyleSheet.create({
  titleBar: {
    height: "50%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
  },
  container: { alignItems: "center" },
  progress: {},
});
