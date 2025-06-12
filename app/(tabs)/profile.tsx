import {
  ImageBackground,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useContext } from "react";
import { Link } from "expo-router";
import { AuthContext } from "../context/AuthProvider";
import { ScrollView } from "react-native-gesture-handler";
import icons from "../constants/icons";
import Spanner from "../components/Spanner";
import Line from "../components/Line";
import IntroPanel from "../components/introPanel";
import ProfileButton from "../components/profileButton";

const Profile = () => {
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ScrollView style={styles.container}>
        <IntroPanel />
        <ProfileButton title="Settings" icon={icons.setting} />
        <ProfileButton title="Policies And Procedures" icon={icons.privacy} />
      </ScrollView>
    </Pressable>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0b0909",
    height: "100%",
  },
});
