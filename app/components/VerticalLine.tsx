import { StyleSheet, Text, View } from "react-native";
import React from "react";

const VerticalLine = ({
  width,
  height,
  color,
  marginInline,
}: {
  width: any;
  height: any;
  marginInline: any;
  color: string;
}) => {
  return (
    <View
      style={{
        width: width,
        height: height,
        backgroundColor: color,
        marginInline: marginInline,
        borderRadius: 100,
      }}
    ></View>
  );
};

export default VerticalLine;

const styles = StyleSheet.create({});
