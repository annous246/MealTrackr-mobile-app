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
import VerticalLine from "@/app/components/VerticalLine";

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
    if (measure == "g/ml") {
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
        setMeasure("Kg/L");
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
        setMeasure("g/ml");
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
        style={{ ...styles.input, height: 40 }}
        keyboardType="numeric"
        placeholder="10.5"
        onChangeText={handleMeasurement}
        value={measurement}
      />
      <VerticalLine height={"80%"} width={1} marginInline={2} color="black" />
      <TouchableOpacity
        onPress={handleMeasure}
        style={{
          ...styles.measure,
          backgroundColor: "rgba(156, 156, 156,0.2)",
        }}
      >
        <Animated.Text
          style={{
            color: "black",
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
    margin: "auto",
    marginLeft: "5%",
    width: 70,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  input: {
    borderRadius: 10,
    textAlign: "center",
    backgroundColor: "white",
    width: "80%",
  },
  container: {
    borderColor: "black",
    borderWidth: 0.3,
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
