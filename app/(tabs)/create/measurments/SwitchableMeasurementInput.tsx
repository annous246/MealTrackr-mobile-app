import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef } from "react";
import CustomButton from "@/app/components/customButton";
import { alreadyDotted } from "@/app/utils/utils";

const SwitchableMeasurementInput = ({
  measurement: measurement,
  setMeasurement: setMeasurement,
  color: color,
  measure: measure,
  setMeasure: setMeasure,
}: {
  measure: string;
  setMeasurement: any;
  setMeasure: any;
  measurement: string;
  color: string;
}) => {
  const measureAnimate = useRef(new Animated.Value(0)).current;
  function handleMeasure() {
    if (measure == "g") {
      Animated.timing(measureAnimate, {
        useNativeDriver: false,
        duration: 200,
        toValue: 50,
      }).start();
      setTimeout(() => {
        Animated.timing(measureAnimate, {
          useNativeDriver: false,
          duration: 200,
          toValue: 0,
        }).start();
      }, 200);

      setTimeout(() => {
        setMeasure("Kg");
      }, 200);
    } else {
      Animated.timing(measureAnimate, {
        useNativeDriver: false,
        duration: 200,
        toValue: 50,
      }).start();
      setTimeout(() => {
        Animated.timing(measureAnimate, {
          useNativeDriver: false,
          duration: 200,
          toValue: 0,
        }).start();
      }, 200);

      setTimeout(() => {
        setMeasure("g");
      }, 200);
    }
  }
  function handleMeasurement(input: string) {
    if (!input || !input.length) setMeasurement(input);
    console.log(measurement);
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
        keyboardType="numeric"
        placeholder="10.5"
        onChangeText={handleMeasurement}
        value={measurement}
      />

      <TouchableOpacity
        onPress={handleMeasure}
        style={{ ...styles.measure, backgroundColor: "#4d5cb3" }}
      >
        <Animated.Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            textAlignVertical: "center",
            transform: [{ translateY: measureAnimate }],
            overflow: "hidden",
          }}
        >
          {measure}
        </Animated.Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwitchableMeasurementInput;

const styles = StyleSheet.create({
  measure: {
    overflow: "hidden",
    display: "flex",
    padding: 1,
    margin: "0%",
    marginLeft: "5%",
    width: "15%",
    borderRadius: 10,
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "white",
    width: "80%",
  },
  container: {
    borderColor: "black",
    borderWidth: 1,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    minWidth: "100%",
    borderRadius: 15,
    padding: 5,
    paddingInline: 10,
  },
});
