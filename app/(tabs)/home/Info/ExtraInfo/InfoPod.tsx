// InfoPod.tsx
import { StyleSheet, Text, View } from "react-native";
import React from "react";

const InfoPod = ({
  value,
  title,
  percentage,
  color,
}: {
  value: string;
  title: string;
  percentage: string;
  color: string;
}) => {
  return (
    <View style={styles.container}>
      {percentage ? (
        <Text style={styles.percentage}>{`${percentage}%`}</Text>
      ) : null}
      {value ? (
        <Text style={[styles.value, { color }]}>{`${value}g`}</Text>
      ) : null}
      {title ? <Text style={[styles.title, { color }]}>{title}</Text> : null}
    </View>
  );
};

export default InfoPod;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    borderRadius: 10,
    marginHorizontal: 5,
    height: 100,
    marginVertical: 5,
  },
  percentage: {
    fontSize: 11,
    color: "gray",
    textAlignVertical: "center",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    textAlignVertical: "center",
  },
  title: {
    fontSize: 11,
    textAlignVertical: "center",
  },
});
