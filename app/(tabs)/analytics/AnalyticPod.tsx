import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Line from "@/app/components/Line";

const AnalyticPod = ({ title, value }: { title: string; value: number }) => {
  return (
    <View
      style={{
        width: "80%",
        alignItems: "center",
        justifyContent: "flex-start",
        flexDirection: "column",
        backgroundColor: "white",
        borderRadius: 10,
        margin: 10,
        padding: 10,
        height: 100,
      }}
    >
      <Text style={{ color: "red", fontWeight: 200, fontSize: 20 }}>
        {title}
      </Text>
      <Line width={"90%"} height={1} marginBottom={10} marginTop={6} />

      <Text>{value}</Text>
    </View>
  );
};

export default AnalyticPod;

const styles = StyleSheet.create({});
