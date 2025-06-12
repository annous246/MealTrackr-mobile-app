import { StyleSheet, Text, View } from "react-native";
import React from "react";

const InfoPod = ({
  value,
  title,
  percentage,
  color: color,
}: {
  value: string;
  title: string;
  percentage: string;
  color: string;
}) => {
  return (
    <View style={styles.container}>
      <Text
        style={{
          textAlignVertical: "center",
          fontSize: 11,
          color: "gray",
        }}
      >
        {percentage}%
      </Text>
      <Text
        style={{
          textAlignVertical: "center",
          fontSize: 15,
          color: color,
          fontWeight: "bold",
        }}
      >
        {value}g
      </Text>
      <Text
        style={{
          textAlignVertical: "center",
          fontSize: 11,
          color: color,
        }}
      >
        {title}
      </Text>
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
    alignContent: "center",
    textAlignVertical: "center",
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // Android shadow
    borderRadius: 10,
    marginInline: 5,
    height: 100,
    marginVertical: 5,
  },
});
