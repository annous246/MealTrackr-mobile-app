import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
} from "react-native-reanimated";
import { interpolate } from "react-native-reanimated";
import { PieSlice } from "@/app/types";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const BorderPieChart = ({
  data,
  calories,
}: {
  data: PieSlice[];
  calories: number;
}) => {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const radius = 60;
  const strokeWidth = 20;
  const cx = 80;
  const cy = 80;
  const circumference = 2 * Math.PI * radius;

  // Shared value from 0 to 1 for animation progress
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(1, { duration: 1000 });
  }, []);

  let rotation = 0;

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        overflow: "hidden",
      }}
    >
      <View
        style={{
          backgroundColor: "#e8e8e8",
          position: "absolute",
          width: 100,
          height: 100,
          overflow: "hidden",
          borderRadius: 1000,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            textAlignVertical: "center",
            fontWeight: "bold",
            color: "white",
          }}
        >
          Calories {"\n" + calories}
        </Text>
      </View>
      <Svg width={160} height={160}>
        <G rotation={-90} origin={`${cx}, ${cy}`}>
          {data.map((slice, index) => {
            const percent = slice.value / total;
            const arcLength = percent * circumference;
            const offsetRotation = rotation;
            rotation += percent * 360;

            const animatedProps = useAnimatedProps(() => ({
              strokeDashoffset: interpolate(
                progress.value,
                [0, 1],
                [arcLength, 0]
              ),
            }));

            return (
              <AnimatedCircle
                key={index}
                cx={cx}
                cy={cy}
                r={radius}
                stroke={slice.color}
                strokeWidth={strokeWidth}
                strokeDasharray={`${arcLength}, ${circumference}`}
                animatedProps={animatedProps}
                strokeLinecap="round"
                fill="none"
                rotation={offsetRotation}
                origin={`${cx}, ${cy}`}
              />
            );
          })}
        </G>
      </Svg>
    </View>
  );
};

export default BorderPieChart;
