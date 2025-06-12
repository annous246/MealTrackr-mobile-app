import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VerticalLine from "@/app/components/VerticalLine";

const InlineInfo = ({
  carbs,
  protein,
  calories,
}: {
  carbs: number;
  protein: number;
  calories: number;
}) => {
  return (
    <View style={styles.spanner}>
      <View style={styles.column}>
        <Text style={styles.text}>Calories</Text>
        <Text style={styles.subText}>{calories} kcal</Text>
      </View>
      <VerticalLine width={3} height={30} color="gray" marginInline={20} />
      <View style={styles.column}>
        <Text style={styles.text}>Protein</Text>
        <Text style={styles.subText}>{protein} g</Text>
      </View>
      <VerticalLine width={3} height={30} color="gray" marginInline={20} />
      <View style={styles.column}>
        <Text style={styles.text}>Carbs</Text>
        <Text style={styles.subText}>{carbs} g</Text>
      </View>
    </View>
  );
};

export default React.memo(InlineInfo);

const styles = StyleSheet.create({
  spanner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  text: {
    fontSize: 15,
    fontWeight: "400",
  },
  subText: {
    fontSize: 12,
    fontWeight: "300",
  },
});
