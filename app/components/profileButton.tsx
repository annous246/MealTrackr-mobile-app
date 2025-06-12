import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import icons from "../constants/icons";
interface profileButtonPropsType {
  title: string;
  icon: any;
}
const ProfileButton = (props: profileButtonPropsType) => {
  const title = props.title;
  const icon = props.icon;
  return (
    <TouchableOpacity
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "75%",
        backgroundColor: "#b6b6b6",
        height: 50,
        overflow: "hidden",
        alignSelf: "center",
        marginVertical: 20,
        borderRadius: 7,
      }}
    >
      <Image style={{ height: 30, width: 30, marginLeft: 15 }} source={icon} />
      <Text
        style={{
          fontSize: 15,
          color: "black",
          width: "80%",
          textAlign: "right",
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default ProfileButton;

const styles = StyleSheet.create({});
