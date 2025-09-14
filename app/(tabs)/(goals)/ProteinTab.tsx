import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { Get, Post } from "@/app/services/api";
import Constants from "expo-constants";
import Icon from "@/app/components/Icon";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Dropdown } from "react-native-element-dropdown";
import { notificationContext } from "@/app/context/NotificationProvider";
import CustomButton from "@/app/components/customButton";
import Slider from "@react-native-community/slider";
import { AuthContext } from "@/app/context/AuthProvider";
import { goalsEmitter } from "@/app/services/emitter";
const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const exerciseData = [
  { label: "Little/no exercise", value: 0, icon: "body-outline" },
  {
    label: "Light exercise/sports 1–3 days/week",
    value: 1,
    icon: "walk-outline",
  },
  { label: "Moderate exercise 3–5 days/week", value: 2, icon: "walk-outline" },
  { label: "Hard exercise 6–7 days/week", value: 3, icon: "flame-outline" },
  {
    label: "Very hard training / physical job",
    value: 4,
    icon: "flame-outline",
  },
];
const { API_URL } = Constants.expoConfig?.extra;
const ProteinTab = () => {
  const [proteinGoal, setProteinGoal] = useState<number>(1000);
  const [exerciceFreq, setExerciceFreq] = useState<number>(0);
  const [gotResults, setGotResults] = useState<boolean>(false);
  const [estimation, setEstimation] = useState<number>(0);
  const [maxEstimation, setMaxEstimation] = useState<number>(0);
  const [minEstimation, setMinEstimation] = useState<number>(0);
  const [TempEstimation, setTempEstimation] = useState<number>(0);
  const [weightGoal, setWeightGoal] = useState<number>(1);

  const [gender, setGender] = useState<boolean>(false);
  const NotificationSettings = useContext(notificationContext);
  const AuthSettings = useContext(AuthContext);

  const AFConverter: object = {
    0: 1.2,
    1: [1.2, 1.6],
    2: [1.6, 2.2],
    3: [2.2, 2.6],
    4: 2.8,
  };
  const fetchGoals = async () => {
    const res = await Get(API_URL + "/macros/read", {});
    if (res.ok === 1) {
      setProteinGoal(res.data.protein_goal);
      NotificationSettings.notify(res.message, 0);
    } else {
      NotificationSettings.notify(res.message, 2);
    }
  };
  useEffect(() => {
    fetchGoals();
  }, []);
  const SpecificIcon = ({ focused, icon, size, color, name }) => {
    return (
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} size={size} color={color} />
        <Text style={focused ? styles.foctext : styles.text}>{name}</Text>
      </View>
    );
  };
  const submissionStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "#2860E9",
    width: "70%",
    minHeight: 20,
    borderRadius: 7,
    margin: 10,
    padding: 10,
    opacity: 1,
  };

  const optionStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "#2860E9",
    width: "33%",
    minHeight: 20,
    borderRadius: 7,
    margin: 10,
    padding: 10,
    opacity: 1,
  };

  function estimate() {
    const user = AuthSettings.user;
    if (!user) return;
    const weight = user.weight;
    if (exerciceFreq == 0 || exerciceFreq == 4) {
      //gain
      setEstimation(weight * AFConverter[exerciceFreq]);
    } else {
      //loss
      setMaxEstimation(weight * AFConverter[exerciceFreq][1]);
      setMinEstimation(weight * AFConverter[exerciceFreq][0]);
      setEstimation(
        (weight * AFConverter[exerciceFreq][1] +
          weight * AFConverter[exerciceFreq][0]) /
          2
      );
    }
    setGotResults(true);
  }

  async function save() {
    const res = await Post(API_URL + "/macros/update_protein_goal", {
      protein: estimation,
    });
    if (res.ok === 1) {
      setProteinGoal(estimation);
      goalsEmitter.emit("newGoal", {});
      NotificationSettings.notify(res.message, 0);
    } else {
      NotificationSettings.notify(res.message, 2);
    }
  }
  function generateEstimator() {
    if (exerciceFreq == 0 || exerciceFreq == 4) {
      return (
        <View
          style={{
            margin: 10,
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ textAlign: "center" }}>Estimated Value</Text>
          <Text style={{ textAlign: "center" }}>{estimation.toFixed(2)} g</Text>
        </View>
      );
    } else {
      return (
        <>
          <Text>Estimated Value</Text>
          <View style={{ flexDirection: "row", height: 100 }}>
            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text>Min</Text>
              <Text>{minEstimation.toFixed(2)} g</Text>
            </View>
            <View
              style={{
                height: 70,
                alignContent: "center",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                width: "50%",
              }}
            >
              <Slider
                style={{ height: "100%", width: "100%" }}
                minimumValue={minEstimation}
                maximumValue={maxEstimation}
                step={0.1} // optional, you can adjust granularity
                minimumTrackTintColor="#ffcc00"
                maximumTrackTintColor="#888"
                thumbTintColor="#ffcc00"
                value={estimation}
                onValueChange={(val) => setTempEstimation(val)} // Update local value smoothly
                onSlidingComplete={(val) => {
                  setEstimation(val); // Apply after user finishes
                }}
              />
              <Text>{TempEstimation.toFixed(2)} g</Text>
            </View>

            <View style={{ flexDirection: "column", alignItems: "center" }}>
              <Text>Max</Text>
              <Text>{maxEstimation.toFixed(2)} g</Text>
            </View>
          </View>
        </>
      );
    }
  }
  useEffect(() => {
    setGotResults(false);
  }, [weightGoal, exerciceFreq]);
  return (
    <ScrollView
      style={{
        height: screenHeight - 120,
      }}
      contentContainerStyle={{
        alignItems: "center",
        justifyContent: "flex-start",
        alignContent: "center",
      }}
    >
      <Text style={{ fontSize: 20, marginTop: "50" }}>My Protein Goal</Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          alignContent: "center",
          backgroundColor: "transparent",
        }}
      >
        <Text
          style={{
            alignItems: "center",
            textAlign: "center",
            textAlignVertical: "center",
          }}
        >
          {proteinGoal.toFixed(2)}
          <Text style={{ fontWeight: "bold" }}> g</Text>
        </Text>
        <SpecificIcon
          icon="food-steak"
          name=""
          color={"red"}
          focused={true}
          size={50}
        />
      </View>
      <Dropdown
        style={{
          height: 50,
          borderColor: "gray",
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 8,
          width: 350,
          marginBottom: 20,
        }}
        data={exerciseData}
        labelField="label"
        valueField="value"
        placeholder="Select Exercice Frequency"
        value={exerciceFreq}
        onChange={(item) => {
          setExerciceFreq(item.value);
          setGotResults(false);
        }}
        placeholderStyle={styles.placeholder}
        selectedTextStyle={styles.selectedText}
        renderItem={({ label, icon }) => (
          <View style={styles.item}>
            <Ionicons
              name={icon}
              size={18}
              color="#ffcc00"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.itemText}>{label}</Text>
          </View>
        )}
      />

      <CustomButton
        style={submissionStyle}
        title="Estimate My Protein"
        onPress={estimate}
      />

      {gotResults && (
        <>
          {generateEstimator()}
          <CustomButton
            style={{ ...submissionStyle, margin: "auto" }}
            title="Save As A New Goal"
            onPress={() => save()}
          />
        </>
      )}
    </ScrollView>
  );
};

export default ProteinTab;

const styles = StyleSheet.create({
  placeholder: {
    color: "dark-gray",
    fontSize: 14,
  },
  selectedText: {
    color: "black",
    fontSize: 14,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  itemText: {
    color: "gray",
    fontSize: 14,
  },
  icon: {
    height: "100%",
    alignItems: "center",
    flexDirection: "column",
  },
  text: {
    fontFamily: "sans-serif",
    fontSize: 10,
    margin: 0,
    width: "100%",
    color: "#0b0909",
    fontWeight: "bold",
  },
  foctext: {
    fontFamily: "sans-serif",
    fontSize: 10,
    margin: 0,
    width: "100%",
    color: "#46f28b",
    fontWeight: "bold",
  },
});
