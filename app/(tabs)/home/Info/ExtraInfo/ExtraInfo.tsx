import { Dimensions, StyleSheet, Text, View, ScrollView } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import CustomButton from "@/app/components/customButton";
import icons from "@/app/constants/icons";
import { Pressable, TextInput } from "react-native-gesture-handler";
import { alreadyDotted } from "@/app/utils/utils";
import NutritionFacts from "./NutritionFacts";
import { Colors } from "react-native/Libraries/NewAppScreen";
import EditableInfo from "./EditableInfo";
import { Post } from "@/app/services/api";
import LoadingComponent from "@/app/components/loadingComponent";
import Constants from "expo-constants";
import { foodType } from "@/app/types";
import { MotiView } from "moti";
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get("window");

const { API_URL } = Constants.expoConfig?.extra;

const ExtraInfo = ({
  protein: protein,
  setCurrentFood: setCurrentFood,
  carbs: carbs,
  calories: calories,
  status: status,
  setStatus: setStatus,
  portion: portion,
  name: name,
  id: id,
}: {
  protein?: number;
  carbs?: number;
  calories?: number;
  portion?: number;
  status: boolean;
  setStatus: any;
  name?: string;
  id?: number;
  setCurrentFood: any;
}) => {
  //const displayValue = useRef(new Animated.Value(status ? 1 : 0)).current;
  const container = useRef(null);
  const [editable, setEditable] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPortion, setCurrentPortion] = useState<string>(
    portion ? portion.toString() : ""
  );
  const [currentProtein, setCurrentProtein] = useState<string>(
    protein ? protein.toString() : ""
  );
  const [currentCarbs, setCurrentCarbs] = useState<string>(
    carbs ? carbs.toString() : ""
  );
  const [currentCalories, setCurrentCalories] = useState<string>(
    calories ? calories.toString() : ""
  );

  async function save() {
    setLoading(true);
    if (parseFloat(currentCalories) != calories) {
      //change
      const response = await Post(API_URL + "/foods/update/update_calories", {
        id: id,
        calories: parseFloat(currentCalories),
      });
      if (response.ok === 1) {
        setCurrentFood((prev: foodType) => {
          const newValue = parseFloat(currentCalories);
          console.log("newValue carbs");
          console.log(newValue);
          console.log(typeof newValue);
          console.log("newValue carbs ");
          return { ...prev, calories: newValue };
        });
      } else {
        console.log("error ", response.message);
      }
      console.log(response);
    }

    if (parseFloat(currentCarbs) != carbs) {
      //change
      const response = await Post(API_URL + "/foods/update/update_carbs", {
        id: id,
        carbs: parseFloat(currentCarbs),
      });
      if (response.ok === 1) {
        console.log("done");
        const newValue = parseFloat(currentCarbs);
        console.log("newValue");
        console.log(newValue);
        setCurrentFood((prev: foodType) => {
          return { ...prev, carbs: newValue };
        });
      } else {
        console.log("error ", response.message);
      }
      console.log(response);
    }

    if (parseFloat(currentProtein) != protein) {
      //change
      const response = await Post(API_URL + "/foods/update/update_protein", {
        id: id,
        protein: parseFloat(currentProtein),
      });
      if (response.ok === 1) {
        const newValue = parseFloat(currentProtein);
        setCurrentFood((prev: foodType) => {
          return { ...prev, protein: newValue };
        });
      } else {
        console.log("error ", response.message);
      }
      console.log(response);
    }
    if (parseFloat(currentPortion) != portion) {
      //change
      const response = await Post(API_URL + "/foods/update/update_portion", {
        id: id,
        portion: parseFloat(currentPortion),
      });
      if (response.ok === 1) {
        const newValue = parseFloat(currentPortion);
        setCurrentFood((prev: foodType) => {
          return { ...prev, portion: newValue };
        });
      } else {
        console.log("error ", response.message);
      }
      console.log(response);
    }

    setLoading(false);
  }
  useEffect(() => {}, [protein]);

  function handlePortion(input: string) {
    if (!input || !input.length) setCurrentPortion(input);
    if (
      isNaN(parseFloat(input)) ||
      parseFloat(input) < 0 ||
      alreadyDotted(input)
    )
      return;
    setCurrentPortion(input);
  }

  function close() {
    setStatus(false);
  }
  function editInfo() {
    setEditable((prev: boolean) => !prev);
  }
  useEffect(() => {
    console.log("extra");
    console.log(status);
  }, [status]);
  return (
    <MotiView
      from={{
        opacity: status ? 1 : 0,
        height: status ? ScreenHeight - 150 : 0,
      }}
      animate={{
        opacity: status ? 1 : 0,
        height: status ? ScreenHeight - 150 : 0,
      }}
      transition={{
        type: "timing",
        duration: 500,
      }}
      style={{
        ...styles.container,
        overflow: "hidden",
        width: ScreenWidth - 50,
        top: ScreenHeight / 2 - (ScreenHeight - 50) / 2, // height / 2 - (component height / 2)
        left: ScreenWidth / 2 - (ScreenWidth - 50) / 2,
      }}
    >
      <ScrollView
        ref={container}
        style={{
          width: "100%",
          height: "100%",
          padding: 10,
        }}
        contentContainerStyle={{ justifyContent: "flex-start" }}
      >
        <LoadingComponent loading={loading} text="Saving Changes" />
        <View
          style={{
            width: "100%",
            borderRadius: 12,
            marginBottom: 10,
          }}
        >
          <CustomButton
            title="X"
            textStyle={{
              textAlign: "center",
              textVerticalAlign: "center",
              color: "rgba(255,255,255,0.8)",
            }}
            style={styles.exitButton}
            onPress={close}
          />
          <Text style={styles.title}>{name}</Text>
        </View>
        <Text style={styles.smallText}>Portion Size (g)</Text>
        <TextInput
          keyboardType="numeric"
          style={styles.input}
          value={currentPortion}
          onChangeText={handlePortion}
        />
        <Text
          style={{
            fontSize: 15,
            color: "white",
            marginBottom: 20,
            marginTop: 30,
          }}
        >
          Nutrition Facts
        </Text>
        <NutritionFacts protein={protein} calories={calories} carbs={carbs} />
        <CustomButton
          textStyle={{
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            textVerticalAlign: "center",
          }}
          onPress={editInfo}
          style={{
            ...styles.submit,
            backgroundColor: "#4094f7",
            margin: 0,
            height: 30,
          }}
          currentIcon={icons.dropdown}
          iconStyle={{
            width: "60%",
            height: "60%",
            color: "red",
            tintColor: "white",
          }}
        />
        <EditableInfo
          status={editable}
          currentCalories={currentCalories}
          currentCarbs={currentCarbs}
          currentProtein={currentProtein}
          setCurrentCalories={setCurrentCalories}
          setCurrentCarbs={setCurrentCarbs}
          setCurrentProtein={setCurrentProtein}
        />
        <CustomButton
          textStyle={{
            textAlign: "center",
            color: "#4094f7",
            fontWeight: "bold",
            textVerticalAlign: "center",
          }}
          title="Save"
          onPress={save}
          style={styles.submit}
        />
      </ScrollView>
    </MotiView>
  );
};
export default ExtraInfo;

const styles = StyleSheet.create({
  submit: {
    backgroundColor: "white",
    color: "#4094f7",
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 25,
    color: "white",
    marginBottom: 30,
    backgroundColor: "#5ca5fc",
    width: "80%",
    textAlign: "left",
    borderRadius: 10,
    padding: 10,
    textAlignVertical: "center",
    height: 70,
  },
  input: {
    width: "100%",
    height: 50,
    fontSize: 10,
    padding: 10,
    borderColor: "black",
    borderWidth: 0.5,
    borderRadius: 5,
    textAlignVertical: "center",
    backgroundColor: "white",
  },
  smallText: {
    color: "white",
    fontSize: 12,
  },
  exitButton: {
    position: "absolute",
    borderRadius: 100,
    padding: 5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
    width: 30,
    height: 30,
    marginRight: 0,
    marginTop: 0,
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  container: {
    position: "absolute",
    backgroundColor: "#4094f7",
    zIndex: 100000,
    borderRadius: 15,
  },
  animatedContainer: {
    position: "relative",
    backgroundColor: "#4094f7",
    zIndex: 10000,
    borderRadius: 15,
    height: "100%",
    width: "100%",
    padding: 10,
  },
  mainContainer: {
    position: "absolute",
    zIndex: 500,
    height: ScreenHeight,
    width: ScreenWidth,
  },
});
