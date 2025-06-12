import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, TextInput } from "react-native-gesture-handler";
import ScrollerContainer from "../../(starter)/ScrollerContainer";
import CustomButton from "../../components/customButton";
import ToggleButton from "../../components/ToggleButton";
import FoodAdderHeader from "./FoodAdderHeader";
import MeasurementInput from "./measurments/MeasurementInput";
import SwitchableMeasurementInput from "./measurments/SwitchableMeasurementInput";
import ProfileButton from "@/app/components/profileButton";
import icons from "@/app/constants/icons";
import Constants from "expo-constants";
import { Post } from "@/app/services/api";
import LoadingComponent from "@/app/components/loadingComponent";
import animations from "@/app/constants/animations";
import LottieView from "lottie-react-native";
import { TabsContext } from "@/app/context/TabsProvider";
const { width, height } = Dimensions.get("window");

const { API_URL } = Constants.expoConfig?.extra;
const Create = () => {
  const [mode, setMode] = useState<boolean>(true);
  const [foodName, setFoodName] = useState<string>("");
  const [kcal, setKcal] = useState<string>("");
  const [protein, setProtein] = useState<string>("");
  const [carbs, setCarbs] = useState<string>("");
  const [portion, setPortion] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [measure, setMeasure] = useState<string>("g");
  const [loading, setLoading] = useState<boolean>(false);
  const [doneStatus, setDoneStatus] = useState<boolean>(false);
  const descAnimation = useRef(new Animated.Value(150)).current;
  const descPadAnimation = useRef(new Animated.Value(50)).current;
  const TabSettings = useContext(TabsContext);
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
  function handleFoodName(value: string) {
    setFoodName(value);
  }
  function handleDescription(value: string) {
    setDescription(value);
  }
  async function submit() {
    setLoading(true);
    const res = await Post(API_URL + "/foods/create", {
      kcal: parseFloat(kcal),
      protein: parseFloat(protein),
      carbs: parseFloat(carbs),
      name: foodName,
      description: mode ? description : null,
      portion:
        measure == "g" ? parseFloat(portion) : parseFloat(portion) * 1000,
    });
    if (res.ok === 1) {
      ///ok
      setDoneStatus(true);
      setTimeout(() => {
        setDoneStatus(false);
      }, 1200);
      TabSettings.setFoodUpdate((prev: boolean) => !prev);
    } else {
      console.log("error");
    }
    setLoading(false);
    console.log(res);
  }
  useEffect(() => {
    console.log(mode);
    if (mode) {
      Animated.timing(descAnimation, {
        useNativeDriver: false,
        duration: 200,
        toValue: 150,
      }).start();
      Animated.timing(descPadAnimation, {
        useNativeDriver: false,
        duration: 200,
        toValue: 50,
      }).start();
    } else {
      Animated.timing(descAnimation, {
        useNativeDriver: false,
        duration: 200,
        toValue: 0,
      }).start();
      Animated.timing(descPadAnimation, {
        useNativeDriver: false,
        duration: 200,
        toValue: 0,
      }).start();
    }
  }, [mode]);
  return (
    <Pressable onPress={Keyboard.dismiss}>
      <LoadingComponent loading={loading} />
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={{ alignContent: "center", alignItems: "center" }}
      >
        <FoodAdderHeader setMode={setMode} mode={mode} />
        <View
          style={{
            width: "100%",
            padding: 50,
            height: 150,
            backgroundColor: "white",
          }}
        >
          <Text>Food Name</Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Bolognese Pasta"
            onChangeText={handleFoodName}
            value={foodName}
          />
        </View>

        <Animated.View
          style={{
            width: "100%",
            padding: descPadAnimation,
            maxHeight: descAnimation,
            overflow: "hidden",
            backgroundColor: "white",
          }}
        >
          <Text>Description </Text>
          <TextInput
            style={styles.input}
            keyboardType="default"
            placeholder="Italien dish composed of Macaroni and meat-tomato sauce (Bolognese style)"
            onChangeText={handleDescription}
            value={description}
          />
        </Animated.View>
        <View style={{ ...styles.row, width: "90%" }}>
          <View style={styles.column}>
            <Text>Calories</Text>
            <MeasurementInput
              color="#3eb55d"
              measure="Kcal"
              measurement={kcal}
              setMeasurement={setKcal}
            />
          </View>
          <View style={styles.column}>
            <Text>Protein</Text>
            <MeasurementInput
              color="#FF6B4A"
              measure="g"
              measurement={protein}
              setMeasurement={setProtein}
            />
          </View>
          <View style={styles.column}>
            <Text>Carbs</Text>
            <MeasurementInput
              color="#F5C26B"
              measure="g"
              measurement={carbs}
              setMeasurement={setCarbs}
            />
          </View>
        </View>
        <View style={{ ...styles.column, width: "80%" }}>
          <Text>Portion</Text>
          <SwitchableMeasurementInput
            color="#3e50b5"
            measure={measure}
            measurement={portion}
            setMeasurement={setPortion}
            setMeasure={setMeasure}
          />
        </View>
        {!doneStatus ? (
          <CustomButton style={submissionStyle} title="Add" onPress={submit} />
        ) : (
          <View style={styles.verify}>
            <LottieView
              style={{
                width: "100%",
                height: "150%",
              }}
              autoPlay
              loop={false}
              source={animations.greenTick}
            ></LottieView>
          </View>
        )}
      </ScrollView>
    </Pressable>
  );
};

export default Create;

const styles = StyleSheet.create({
  verify: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "#2860E9",
    width: "70%",
    height: 41,
    borderRadius: 7,
    margin: 10,
    opacity: 1,
    overflow: "hidden",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 150,
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  input: {
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 1,
    textAlign: "left",
  },
  toggle: {
    margin: "auto",
  },
  scrollContainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
});
