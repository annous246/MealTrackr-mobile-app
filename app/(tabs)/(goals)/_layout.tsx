import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CaloriesTab from "./CaloriesTab";
import Icon from "@/app/components/Icon";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ProteinTab from "./ProteinTab";
import CarbsTab from "./CarbsTab";

const GaolsLayout = () => {
  const Tabs = createBottomTabNavigator();

  const SpecificIcon = ({ focused, icon, size, color, name }) => {
    return (
      <View style={styles.icon}>
        <MaterialCommunityIcons name={icon} size={size} color={color} />
        <Text style={focused ? styles.foctext : styles.text}>{name}</Text>
      </View>
    );
  };
  return (
    <Tabs.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: "#46f28b",
        tabBarInactiveTintColor: "#CFB1B7",
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tabs.Screen
        options={{
          title: "Calories",
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Icon
                focused={focused}
                icon="flash"
                name="Calories"
                size={size}
                color={color}
              />
            );
          },
        }}
        component={CaloriesTab}
        name="calories"
      />
      <Tabs.Screen
        options={{
          title: "Protein",
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <SpecificIcon
                name="Protein"
                icon={"food-steak"}
                size={size}
                focused={focused}
                color={color}
              />
            );
          },
        }}
        component={ProteinTab}
        name="Protein"
      />
      <Tabs.Screen
        options={{
          title: "Carbs",
          headerShown: false,
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Icon
                focused={focused}
                icon="flame"
                name="Carbs"
                size={size}
                color={color}
              />
            );
          },
        }}
        component={CarbsTab}
        name="carbs"
      />
    </Tabs.Navigator>
  );
};

export default GaolsLayout;

const styles = StyleSheet.create({
  icon: {
    marginTop: "30%",
    height: "130%",
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
