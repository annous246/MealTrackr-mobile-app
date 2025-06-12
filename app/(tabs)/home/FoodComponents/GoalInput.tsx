import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { alreadyDotted } from "@/app/utils/utils";

const GoalInput = ({
  title,
  setGoal,
  goal,
}: {
  title: string;
  setGoal: any;
  goal: number;
}) => {
  const [goals, setGoals] = useState<string>(goal.toFixed(2));
  function handle(input: string) {
    if (!input || !input.length) setGoals(input);
    if (
      isNaN(parseFloat(input)) ||
      parseFloat(input) < 0 ||
      alreadyDotted(input)
    )
      return;
    setGoals(input);
  }
  useEffect(() => {
    setGoal(parseFloat(parseFloat(goals).toFixed(2)));
  }, [goals]);
  return (
    <View style={{ margin: 5 }}>
      <Text>{title} Goal (g)</Text>
      <TextInput
        placeholder="goal Value"
        value={goals}
        onChangeText={handle}
        keyboardType="numeric"
        style={{ borderWidth: 1, borderColor: "black", borderRadius: 5 }}
      />
    </View>
  );
};

export default GoalInput;

const styles = StyleSheet.create({});
