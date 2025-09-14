import { BarChart } from "react-native-chart-kit";
import { Dimensions, View } from "react-native";
import { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

const MyBarChart = ({ data }: { data: any }) => {
  return (
    <View>
      <BarChart
        data={data}
        width={Math.max(screenWidth, data.labels.length * 50)}
        height={250}
        showBarTops={false}
        yAxisLabel=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#ffffff",
          backgroundGradientTo: "#ffffff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(59, 130, 246, ${opacity})`,
          barPercentage: 0.7,
          barRadius: 10,
          propsForBackgroundLines: {
            strokeWidth: 0,
          },
        }}
        style={{
          borderRadius: 10,
          marginVertical: 8,
          alignSelf: "center",
          padding: 20,

          paddingRight: 50,
        }}
        showValuesOnTopOfBars={true}
        fromZero={true}
        withInnerLines={false}
        withCustomBarColorFromData={true}
        flatColor={true}
        segments={4}
      />
    </View>
  );
};

export default MyBarChart;
