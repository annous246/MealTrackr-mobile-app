import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { Link } from "expo-router";
import MeasurementInput from "../create/measurments/MeasurementInput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AuthContext } from "@/app/context/AuthProvider";
import SwitchableMeasurementInput from "../create/measurments/SwitchableMeasurementInput";
import CustomButton from "@/app/components/customButton";
import { Post } from "@/app/services/api";
import Constants from "expo-constants";
import { notificationContext } from "@/app/context/NotificationProvider";
import LoadingComponent from "@/app/components/loadingComponent";
const { API_URL } = Constants.expoConfig?.extra;
const Settings = () => {
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
  const NotificationSettings = useContext(notificationContext);
  const AuthSettings = useContext(AuthContext);
  console.log(AuthSettings.user);
  const [age, setAge] = useState<string>(
    AuthSettings.user?.age.toString() ?? "0"
  );
  const [weight, setWeight] = useState<string>(
    AuthSettings.user?.weight.toString() ?? "0"
  );
  const [height, setHeight] = useState<string>(
    AuthSettings.user?.height.toString() ?? "0"
  );
  const [gender, setGender] = useState<string>(
    AuthSettings.user?.gender.toString() ?? "false"
  );
  const [loading, setLoading] = useState<boolean>(false);
  async function save() {
    setLoading(true);
    const res = await Post(API_URL + "/starter/stepper_finished", {
      analytics: { height: height, weight: weight, age: age, gender: gender },
    });
    if (res.ok) {
      AuthSettings.setUser((prev: object) => {
        return {
          ...prev,
          gender: gender,
          age: age,
          height: height,
          weight: weight,
        };
      });
      NotificationSettings.notify(res.message, 0);
    } else {
      NotificationSettings.notify(res.message, 2);
    }
    setLoading(false);
  }
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
        }}
      >
        <LoadingComponent loading={loading} />
        <Text style={{ fontSize: 17 }}>Height</Text>
        <MeasurementInput
          measure="cm"
          measurement={height}
          setMeasurement={setHeight}
          color="transparent"
          style={{ width: "80%", margin: 20 }}
        />
        <Text style={{ fontSize: 17 }}>Age</Text>
        <MeasurementInput
          measure="yo"
          measurement={age}
          setMeasurement={setAge}
          color="transparent"
          style={{ width: "80%", margin: 20 }}
        />
        <Text style={{ fontSize: 17 }}>Weight</Text>
        <MeasurementInput
          measure="kg"
          measurement={weight}
          setMeasurement={setWeight}
          color="transparent"
          style={{ width: "80%", margin: 20 }}
        />

        <CustomButton
          style={submissionStyle}
          title="Save Changes"
          onPress={save}
        />
      </View>
    </Pressable>
  );
};

export default Settings;

const styles = StyleSheet.create({});
