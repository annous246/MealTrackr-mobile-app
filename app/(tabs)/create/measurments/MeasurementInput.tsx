import { StyleSheet, Text, TextInput, View } from "react-native";
import React from "react";
import CustomButton from "@/app/components/customButton";
import { alreadyDotted } from "@/app/utils/utils";

const MeasurementInput = ({
  measurement: measurement,
  setMeasurement: setMeasurement,
  color: color,
  measure: measure,
}: {
  measure: string;
  setMeasurement: any;
  measurement: string;
  color: string;
}) => {
  function handleMeasurement(input: string) {
    if (!input || !input.length) setMeasurement(input);
    if (
      isNaN(parseFloat(input)) ||
      parseFloat(input) < 0 ||
      alreadyDotted(input)
    )
      return;
    setMeasurement(input);
  }
  return (
    <View style={{ ...styles.container, backgroundColor: color }}>
      <TextInput
        style={styles.input}
        keyboardType="decimal-pad"
        placeholder="10.5"
        onChangeText={handleMeasurement}
        value={measurement}
      />
      <Text style={styles.measure}>{measure}</Text>
    </View>
  );
};

export default MeasurementInput;

const styles = StyleSheet.create({
  measure: {
    textAlign: "center",
    padding: 1,
    marginLeft: 4,
  },
  input: {
    borderRadius: 10,
    textAlign: "left",
    backgroundColor: "white",
    width: "60%",
  },
  container: {
    borderColor: "black",
    borderWidth: 1,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: 115,
    borderRadius: 15,
    padding: 10,
  },
});
