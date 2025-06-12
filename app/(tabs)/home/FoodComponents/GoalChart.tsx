import React, { useEffect } from "react";
import { View, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  interpolate,
} from "react-native-reanimated";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const GoalChart = ({
  progressValue,
  goalValue,
  progressColor = "#4caf50",
  goalColor = "#e0e0e0",
  title = "Placeholder",
}: {
  progressValue: number;
  goalValue: number;
  progressColor?: string;
  goalColor?: string;
  title?: string;
}) => {
  const radius = 70;
  const strokeWidth = 20;
  const center = 100; // Center of the SVG

  const halfCircumference = Math.PI * radius;

  const clampedProgress = goalValue ? progressValue / goalValue : 1;

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(Math.min(clampedProgress, 1), {
      duration: 1000,
    });
  }, [clampedProgress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: interpolate(
      progress.value,
      [0, 1],
      [halfCircumference, 0]
    ),
  }));

  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={200} height={140} viewBox="0 0 200 140">
        <G rotation={-180} origin={`${center}, ${center}`}>
          <Circle
            cx={center}
            cy={center}
            r={radius}
            stroke={goalColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${halfCircumference}, ${2 * Math.PI * radius}`}
            strokeLinecap="round"
            fill="none"
          />
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke={progressColor}
            strokeWidth={strokeWidth}
            strokeDasharray={`${halfCircumference}, ${2 * Math.PI * radius}`}
            animatedProps={animatedProps}
            strokeLinecap="round"
            fill="none"
          />
        </G>
      </Svg>

      <View
        style={{
          position: "absolute",
          top: 50,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", color: progressColor }}>
          {title}
        </Text>
        <Text style={{ fontWeight: "bold", color: "#333" }}>
          {`${
            Math.round(clampedProgress * 100) == 100
              ? "Perfect"
              : Math.round(clampedProgress * 100) + " %"
          }`}
        </Text>
        {goalValue > 0 ? (
          <Text style={{ color: "#666", fontSize: 12 }}>
            {progressValue.toFixed(2)} / {goalValue}
          </Text>
        ) : (
          ""
        )}
      </View>
    </View>
  );
};

export default React.memo(GoalChart);
