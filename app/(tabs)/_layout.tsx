import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import { Redirect } from "expo-router";
import icons from "../constants/icons";
import { text } from "body-parser";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from "./home/home";
import Profile from "./profile";
import Bookmark from "./bookmark/bookmark";
import Create from "./create/create";
const Tabs = createBottomTabNavigator();
const TabsLayout = () => {
  const Icon = ({ focused, icon, size, color, name }) => {
    return (
      <View style={styles.icon}>
        <Ionicons name={icon} size={size} color={color} />
        <Text style={focused ? styles.foctext : styles.text}>{name}</Text>
      </View>
    );
  };
  return (
    <>
      <Tabs.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: "#8B80F9",
          tabBarInactiveTintColor: "#CFB1B7",
          tabBarStyle: { backgroundColor: "#0b0909" },
        }}
      >
        <Tabs.Screen
          name="home"
          component={Home}
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Icon
                  focused={focused}
                  icon="home"
                  name="Home"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="profile"
          component={Profile}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Icon
                  focused={focused}
                  icon="person"
                  name="Profile"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          component={Bookmark}
          name="bookmark"
          options={{
            title: "Bookmark",
            headerShown: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Icon
                  focused={focused}
                  icon="fast-food"
                  name="Bookmark"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
        <Tabs.Screen
          name="create"
          component={Create}
          options={{
            title: "Create",
            headerShown: false,
            tabBarIcon: ({ size, focused, color }) => {
              return (
                <Icon
                  focused={focused}
                  icon="create"
                  name="Create"
                  size={size}
                  color={color}
                />
              );
            },
          }}
        />
      </Tabs.Navigator>
    </>
  );
};

export default TabsLayout;

const styles = StyleSheet.create({
  image: {
    width: 10,
    height: "100%",
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
    color: "#8B80F9",
    fontWeight: "bold",
  },
  icon: {
    marginTop: "30%",
    height: "130%",
    alignItems: "center",
    flexDirection: "column",
  },
});
