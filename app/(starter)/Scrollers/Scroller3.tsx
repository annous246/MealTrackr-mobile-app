import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CustomButton from "@/app/components/customButton";
import icons from "../../constants/icons";
import AnaliticsController from "../AnaliticsController";
import ProgressBar from "../statusBar/ProgressBar";
import AnimatedBar from "../statusBar/AnimatedBar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ScrollView } from "react-native-gesture-handler";
import { AuthContext } from "@/app/context/AuthProvider";

const { height: screenWidth, height: screenHeight } = Dimensions.get("window");
const Scroller3 = ({
  setNext: setNext,
  pagination: pagination,
}: {
  setNext: any;
  pagination: number;
}) => {
  const AuthSettings = useContext(AuthContext);
  const [age, setAge] = useState<number>(AuthSettings.user?.age);
  useEffect(() => {
    AuthSettings.setUser((prev: any) => {
      return { ...prev, age: age };
    });
  }, [age]);
  function handleage(currentage: string) {
    if (!currentage || !currentage.length) {
      setAge(0);
      return;
    }

    if (isNaN(parseInt(currentage))) return;
    const inputage = parseInt(currentage);
    if (inputage >= 0 && inputage < 200) {
      setAge(inputage);
    }
  }
  const NextStyle = { width: 200, height: 100, backgroundColor: "blue" };
  return (
    <Pressable onPress={Keyboard.dismiss} style={styles.pressableContainer}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: 0.75 * screenHeight,
          marginBottom: 500,
        }}
      >
        <View style={styles.animationContainer}>
          <Image source={icons.personHeight} style={styles.image} />
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: "50%",
          }}
        >
          <Text>Age</Text>
          <TextInput
            placeholderTextColor="#ff9b7c"
            style={styles.input}
            placeholder={"160cm"}
            keyboardType="numeric"
            value={age ? age.toString() : ""}
            onChangeText={handleage}
          />
        </View>
      </ScrollView>
    </Pressable>
  );
};

export default Scroller3;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    width: "100%",
    textAlign: "center",
  },
  animationContainer: {
    backgroundColor: "white",
    height: "100%",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  image: {
    width: "80%",
    height: "100%",
    borderRadius: 10,
  },
  container: {
    backgroundColor: "black",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "90%",
  },
  pressableContainer: {
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
});
