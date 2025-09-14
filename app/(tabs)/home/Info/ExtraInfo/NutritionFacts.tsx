import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import PieChart from "./TestChart";
import TestChart from "./TestChart";
import InfoPod from "./InfoPod";
import { PieSlice } from "@/app/types";

const NutritionFacts = ({
  protein,
  carbs,
  calories,
}: {
  protein?: number;
  carbs?: number;
  calories?: number;
}) => {
  const [calpercentage, setcalpercentage] = useState<number>(0.0);
  const [cpercentage, setCpercentage] = useState<number>(0.0);
  const [ppercentage, setPpercentage] = useState<number>(0.0);
  const [reset, setReset] = useState<boolean>(false);
  const [rankingArray, setRankingArray] = useState<PieSlice[]>([]);

  function compare(element: PieSlice, other: PieSlice): number {
    if (element.value == other.value) return 0;
    return element.value < other.value ? 1 : -1;
  }
  useEffect(() => {
    if (carbs != null && protein != null && calories != null) {
      const total: number = protein + carbs + calories;
      setcalpercentage((calories / total) * 100);
      setCpercentage((carbs / total) * 100);
      setPpercentage((protein / total) * 100);
      let currentarray = [
        { value: (calories / total) * 100, color: "#61DAFB" },
        { value: (carbs / total) * 100, color: "#42b883" },
        { value: (protein / total) * 100, color: "#fc4242" },
      ];

      setRankingArray([]);
      const id = setTimeout(() => {
        setRankingArray(currentarray.sort(compare));
      }, 1000);
      //setReset(false);
      return () => {
        if (id) clearTimeout(id);
      };
    }
  }, [calories, carbs, protein]);

  useEffect(() => {
    if (carbs != null && protein != null && calories != null) {
      const total: number = protein + carbs + calories;
      setcalpercentage((calories / total) * 100);
      setCpercentage((carbs / total) * 100);
      setPpercentage((protein / total) * 100);
      let currentarray = [
        { value: (calories / total) * 100, color: "#61DAFB" },
        { value: (carbs / total) * 100, color: "#42b883" },
        { value: (protein / total) * 100, color: "#fc4242" },
      ];
      setRankingArray(currentarray.sort(compare));
    }
  }, []);
  return (
    <View style={styles.container}>
      {rankingArray.length > 0 && (
        <TestChart data={rankingArray} calories={calories ?? 0} />
      )}

      <InfoPod
        key={calpercentage}
        value={calories != null ? calories.toFixed(1) : ""}
        title={"Calories"}
        percentage={calpercentage.toFixed(2)}
        color="#61DAFB"
      />

      <InfoPod
        value={protein != null ? protein.toFixed(1) : ""}
        title={"Protein"}
        percentage={ppercentage.toFixed(2)}
        color="#fc4242"
      />
      <InfoPod
        value={carbs != null ? carbs.toFixed(1) : ""}
        title={"Carbs"}
        percentage={cpercentage.toFixed(2)}
        color="#42b883"
      />
    </View>
  );
};

export default NutritionFacts;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: "white",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    height: 300,
    display: "flex",
    flexWrap: "wrap",
  },
});
