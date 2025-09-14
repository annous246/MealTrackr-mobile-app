import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";

const DayStub = ({
  title,
  onPress,
  number,
  status,
  disabled,
}: {
  title: string;
  onPress: () => void;
  number: number;
  status: boolean;
  disabled: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={{
        backgroundColor: status ? "#0088ff" : "white",
        padding: 8,
        borderRadius: 10,
        width: 50,
        flexDirection: "column",
        justifyContent: "space-around",
        height: 60,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      <Text
        style={{
          color: status ? "white" : "gray",
          fontSize: 12,
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: status ? "white" : "black",
        }}
      >
        {number}
      </Text>
    </TouchableOpacity>
  );
};

export default DayStub;

const styles = StyleSheet.create({});
