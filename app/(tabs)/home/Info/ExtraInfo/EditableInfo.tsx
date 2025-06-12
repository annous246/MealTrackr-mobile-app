import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { alreadyDotted } from "@/app/utils/utils";
import { MotiView } from "moti";
import Collapsible from "react-native-collapsible";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
type EditableInfoProps = {
  status: boolean;
  currentCalories: string;
  currentCarbs: string;
  currentProtein: string;
  setCurrentCalories: (value: string) => void;
  setCurrentCarbs: (value: string) => void;
  setCurrentProtein: (value: string) => void;
};
const EditableInfo = ({
  status,
  currentCalories,
  currentCarbs,
  currentProtein,
  setCurrentCalories,
  setCurrentCarbs,
  setCurrentProtein,
}: EditableInfoProps) => {
  const heightAnimate = useSharedValue(status ? 100 : 0);
  const [test, setTest] = useState<boolean>(false);
  function handleCarbs(input: string) {
    if (!input || !input.length) setCurrentCarbs(input);
    if (
      isNaN(parseFloat(input)) ||
      parseFloat(input) < 0 ||
      alreadyDotted(input)
    )
      return;
    setCurrentCarbs(input);
  }

  function handleProtein(input: string) {
    if (!input || !input.length) setCurrentProtein(input);
    if (
      isNaN(parseFloat(input)) ||
      parseFloat(input) < 0 ||
      alreadyDotted(input)
    )
      return;
    setCurrentProtein(input);
  }

  function handleCalories(input: string) {
    if (!input || !input.length) setCurrentCalories(input);
    if (
      isNaN(parseFloat(input)) ||
      parseFloat(input) < 0 ||
      alreadyDotted(input)
    )
      return;
    setCurrentCalories(input);
  }
  const scaleY = useSharedValue(status ? 1 : 0);
  const opacityAnimate = useSharedValue(status ? 1 : 0);

  useEffect(() => {
    scaleY.value = withTiming(status ? 1 : 0, { duration: 500 });
    opacityAnimate.value = withTiming(status ? 1 : 0, { duration: 200 });
    heightAnimate.value = withTiming(status ? 100 : 0, { duration: 100 });
  }, [status]);

  const inputAnimate = useAnimatedStyle(() => {
    return {
      transform: [{ scaleY: scaleY.value }],
      opacity: opacityAnimate.value,
      height: heightAnimate.value,
    };
  });
  return (
    <MotiView
      from={{ height: 0, opacity: 0 }}
      animate={{ height: status ? 100 : 0, opacity: status ? 1 : 0 }}
      transition={{
        type: "timing",
        duration: 250,
      }}
      style={[styles.container, { overflow: "hidden" }]}
    >
      <View style={styles.column}>
        <Text>Calories</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={currentCalories}
          onChangeText={handleCalories}
        />
      </View>
      <View style={styles.column}>
        <Text>Protein</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={currentProtein}
          onChangeText={handleProtein}
        />
      </View>
      <View style={styles.column}>
        <Text>Carbs</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          value={currentCarbs}
          onChangeText={handleCarbs}
        />
      </View>
    </MotiView>
  );
};

export default EditableInfo;

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    borderRadius: 5,
    width: "100%",
    textAlign: "center",
    height: 60,
  },
  column: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    margin: 5,
    width: 70,
  },
  container: {
    backgroundColor: "white",
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
    marginTop: 10,
  },
});
