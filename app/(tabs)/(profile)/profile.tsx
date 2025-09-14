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
import React, { useContext, useEffect, useState } from "react";
import { Link, router } from "expo-router";
import { AuthContext } from "../../context/AuthProvider";
import { ScrollView } from "react-native-gesture-handler";
import icons from "../../constants/icons";
import Spanner from "../../components/Spanner";
import Line from "../../components/Line";
import IntroPanel from "../../components/introPanel";
import ProfileButton from "../../components/profileButton";
import { notificationContext } from "@/app/context/NotificationProvider";
import NotificationBar from "@/app/components/NotificationBar";
import useAutoTimer from "@/app/hooks/useAutoTimer";
const Profile = () => {
  const NotificationSettings = useContext(notificationContext);
  const [p, setP] = useState(false);
  const [call, setCall] = useState(false);

  // useAutoTimer(() => {});
  function pop() {
    NotificationSettings.notify(
      "testtesttesttesttesttesttesttestesttetesttesttesttesttesttesttesttesttesttesttesttesttest",
      0
    );
    setCall((prev) => !prev);
    /*
    console.log("first");
    console.log(p);*/
  }
  useEffect(() => {}, [call]);
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.container}>
      <ScrollView style={styles.container}>
        <IntroPanel />

        <ProfileButton
          onPress={() => {
            router.push("/(tabs)/(profile)/settings");
          }}
          title="Settings"
          icon={icons.setting}
        />
        <ProfileButton
          onPress={() => {
            router.push("/(tabs)/(profile)/terms");
          }}
          title="Terms & Conditions"
          icon={icons.privacy}
        />
      </ScrollView>
    </Pressable>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    height: "100%",
  },
});
