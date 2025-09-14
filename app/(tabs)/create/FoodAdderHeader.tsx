import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ToggleButton from "@/app/components/ToggleButton";

const FoodAdderHeader = ({
  setMode: setMode,
  mode: mode,
}: {
  setMode: any;
  mode: boolean;
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Food Adder</Text>
      <ToggleButton
        setStatus={setMode}
        mode1="Auto"
        mode2="Manual"
        status={mode}
      />
    </View>
  );
};

export default FoodAdderHeader;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    backgroundColor: "white",
    paddingVertical: 20,
    height: 90,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    borderRadius: 1,
  },

  title: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: "monospace",
    color: "black",
  },
});
