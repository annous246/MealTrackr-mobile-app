import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import Constants from "expo-constants";

const { API_URL } = Constants.expoConfig?.extra;

const Test = () => {
  return <View style={styles.mainContainer}></View>;
};

export default Test;
const styles = StyleSheet.create({
  mainContainer: {
    height: 180,
    backgroundColor: "white",
    width: "100%",
    zIndex: 100,
    position: "relative",
    borderEndEndRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: "hidden",
  },
});
