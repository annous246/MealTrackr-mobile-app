import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useContext,
} from "react";
import icons from "@/app/constants/icons";
import GoalChart from "./GoalChart";
import MealBar from "./MealBar";
import CustomButton from "@/app/components/customButton";
import GoalInput from "./GoalInput";
import { Get, Post } from "@/app/services/api";
import Constants from "expo-constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { TabsContext } from "@/app/context/TabsProvider";
import { notificationContext } from "@/app/context/NotificationProvider";
import useAutoTimer from "@/app/hooks/useAutoTimer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DatePicker from "./DateControl/DatePicker";
import { DateContext } from "@/app/context/DateProvider";
import { goalsEmitter } from "@/app/services/emitter";

const { API_URL } = Constants.expoConfig?.extra;

const HomeHeader = ({
  caloriesProgress,
  setCaloriesProgress,
  proteinProgress,
  setProteinProgress,
  carbsProgress,
  setCarbsProgress,
  setFoodDisplay,
  getPreviousProgress,
  getProgress,
}: {
  caloriesProgress: number;
  setCaloriesProgress: any;
  proteinProgress: number;
  setProteinProgress: any;
  carbsProgress: number;
  setCarbsProgress: any;
  setFoodDisplay: any;
  getProgress: any;
  getPreviousProgress: any;
}) => {
  const [caloriesGoal, setCaloriesGoal] = useState<number>(1000);
  const [proteinGoal, setProteinGoal] = useState<number>(1000);
  const [carbsGoal, setCarbsGoal] = useState<number>(1000);

  const [caloriesTempGoal, setCaloriesTempGoal] = useState(caloriesGoal);
  const [proteinTempGoal, setProteinTempGoal] = useState(proteinGoal);
  const [carbsTempGoal, setCarbsTempGoal] = useState(carbsGoal);

  const [switchAnimated, setSwitchAnimated] = useState<boolean>(false);
  const [resetting, setResetting] = useState<boolean>(false);
  const [currentMain, setCurrentMain] = useState<string>("Calories");
  useAutoTimer(() => reset());
  const opacityAnimated = useSharedValue(1);
  const opacityAnimated2 = useSharedValue(0);

  const [disabled, setDisabled] = useState<boolean>(false);
  const DateSettings = useContext(DateContext);
  const goalConverter = {
    calories: caloriesGoal,
    protein: proteinGoal,
    carbs: carbsGoal,
  };
  const progressConverter = {
    calories: caloriesProgress,
    protein: proteinProgress,
    carbs: carbsProgress,
  };
  const progressColorConverter = {
    calories: "#FF6B6B",
    protein: "#726bff",
    carbs: "#6bff92",
  };

  const TabSettings = useContext(TabsContext);
  const loadGoal = () => goalConverter[currentMain.toLowerCase()];
  const loadProgress = () => progressConverter[currentMain.toLowerCase()];
  const loadColor = () => progressColorConverter[currentMain.toLowerCase()];

  const switching = () => {
    setSwitchAnimated((prev) => !prev);
  };

  const NotificationSettings = useContext(notificationContext);
  const fetchGoals = async () => {
    const res = await Get(API_URL + "/macros/read", {});
    if (res.ok === 1) {
      setProteinGoal(res.data.protein_goal);
      setCarbsGoal(res.data.carbs_goal);
      setCaloriesGoal(res.data.calories_goal);
      setProteinTempGoal(res.data.protein_goal);
      setCarbsTempGoal(res.data.carbs_goal);
      setCaloriesTempGoal(res.data.calories_goal);
      NotificationSettings.notify(res.message, 0);
    } else {
      NotificationSettings.notify(res.message, 2);
    }
  };
  const handleMealPress = useCallback((meal: string) => {
    setCurrentMain(meal);
  }, []);

  const saveGoals = async () => {
    if (proteinGoal !== proteinTempGoal) {
      const res = await Post(API_URL + "/macros/update_protein_goal", {
        protein: proteinTempGoal,
      });
      if (res.ok === 1) {
        setProteinGoal(proteinTempGoal);
        NotificationSettings.notify(res.message, 0);
      } else {
        NotificationSettings.notify(res.message, 2);
      }
    }
    if (carbsGoal !== carbsTempGoal) {
      const res = await Post(API_URL + "/macros/update_carbs_goal", {
        carbs: carbsTempGoal,
      });
      if (res.ok === 1) {
        setCarbsGoal(carbsTempGoal);
        NotificationSettings.notify(res.message, 0);
      } else {
        NotificationSettings.notify(res.message, 2);
      }
    }
    if (caloriesGoal !== caloriesTempGoal) {
      const res = await Post(API_URL + "/macros/update_calories_goal", {
        calories: caloriesTempGoal,
      });
      if (res.ok === 1) {
        setCaloriesGoal(caloriesTempGoal);
        NotificationSettings.notify(res.message, 0);
      } else {
        NotificationSettings.notify(res.message, 2);
      }
    }
  };
  async function reset() {
    console.log("actual rest");
    const pastdate = await AsyncStorage.getItem("currentDate");

    //conceptually bad to split two transactionals
    const res = await Post(API_URL + "/progress/reset", { PastDate: pastdate });
    const res2 = await Post(API_URL + "/foods/consumed/reset", {
      PastDate: pastdate,
    });

    if (res.ok === 1 && res2.ok === 1) {
      setCaloriesProgress(0.0);
      setCarbsProgress(0.0);
      setProteinProgress(0.0);

      await AsyncStorage.setItem("currentDate", JSON.stringify(new Date()));
      NotificationSettings.notify(res.message, 0);

      TabSettings.setFoodUpdate((prev: boolean) => !prev);
      DateSettings.setCurrentDate(new Date());
      setResetting(true);
      setResetting(false);
    } else {
      NotificationSettings.notify(res.message, 2);
    }
  }

  useEffect(() => {
    goalsEmitter.on("newGoal", () => {
      fetchGoals();
    });
    fetchGoals();
  }, []);
  useEffect(() => {
    let id = null;
    setDisabled(true);
    id = setTimeout(() => {
      console.log("good");
      setDisabled(false);
    }, 2000);

    console.log("current elements chaged");
    return () => {
      if (id) clearTimeout(id);
      setDisabled(false);
    };
  }, [
    caloriesProgress,
    proteinProgress,
    carbsProgress,
    TabSettings.foodUpdate,
  ]);
  useEffect(() => {
    //change date so outside it auto gets new progress
    console.log(new Date().getDate());
    console.log(DateSettings.currentDate.getDate());
    console.log("current date inside");
    console.log(DateSettings.currentDate);
    if (new Date().getDate() != DateSettings.currentDate.getDate()) {
      setFoodDisplay(false);
      getPreviousProgress(DateSettings.currentDate);
    } else {
      setFoodDisplay(true);
      console.log(getProgress);
      getProgress();
    }
  }, [DateSettings.currentDate]);

  useEffect(() => {
    opacityAnimated2.value = withTiming(switchAnimated ? 1 : 0, {
      duration: 500,
    });
    opacityAnimated.value = withTiming(switchAnimated ? 0 : 1, {
      duration: 500,
    });
  }, [switchAnimated]);

  const animatedStyle1 = useAnimatedStyle(() => ({
    opacity: opacityAnimated.value,
  }));

  const animatedStyle2 = useAnimatedStyle(() => ({
    opacity: opacityAnimated2.value,
  }));

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.edit} onPress={switching}>
          <Image style={{ width: "60%", height: "60%" }} source={icons.edit} />
        </TouchableOpacity>
        <Text style={styles.title}>Daily Meal Plan</Text>
        <View style={styles.premium}>
          <Image
            style={{ width: "60%", height: "60%" }}
            source={icons.premium}
          />
        </View>
      </View>

      {switchAnimated ? (
        <Animated.ScrollView style={[animatedStyle2]}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
            }}
          >
            <CustomButton
              onPress={saveGoals}
              title="Save Nutrition Goals"
              style={{
                width: "200",
                height: "auto",
                backgroundColor: "black",
                borderRadius: 10,

                padding: 10,
                marginBottom: 10,
              }}
              textStyle={{ color: "white", textAlign: "center" }}
            />
            <CustomButton
              onPress={reset}
              title="Reset Todays Meals"
              style={{
                width: "200",
                height: "auto",
                backgroundColor: "black",
                borderRadius: 10,
                padding: 10,
                marginBottom: 10,
              }}
              textStyle={{ color: "white", textAlign: "center" }}
            />
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
              flexDirection: "row",
            }}
          >
            <GoalInput
              title="Calories"
              goal={caloriesTempGoal}
              setGoal={setCaloriesTempGoal}
            />
            <GoalInput
              title="Carbs"
              goal={carbsTempGoal}
              setGoal={setCarbsTempGoal}
            />
            <GoalInput
              title="Protein"
              goal={proteinTempGoal}
              setGoal={setProteinTempGoal}
            />
          </View>
        </Animated.ScrollView>
      ) : (
        <Animated.View
          style={[
            {
              ...styles.container,
              flexDirection: "column",
            },
            animatedStyle1,
          ]}
        >
          {!resetting && <DatePicker disabled={false} />}
          <View style={{ ...styles.container, height: "70%" }}>
            <View style={styles.counter}>
              <GoalChart
                title={currentMain}
                progressValue={loadProgress()}
                goalValue={loadGoal()}
                progressColor={loadColor()}
                goalColor="#DDD"
              />
            </View>
            <View style={styles.viewer}>
              <MealBar
                onPress={() => handleMealPress("Calories")}
                title="Calories"
                goal={caloriesGoal}
                progress={caloriesProgress}
                progressColor="#FF6B6B"
                goalColor="#c5c9c6"
              />
              <MealBar
                onPress={() => handleMealPress("Protein")}
                title="Protein"
                goal={proteinGoal}
                progress={proteinProgress}
                progressColor="#726bff"
                goalColor="#c5c9c6"
              />
              <MealBar
                onPress={() => handleMealPress("Carbs")}
                title="Carbs"
                goal={carbsGoal}
                progress={carbsProgress}
                progressColor="#6bff92"
                goalColor="#c5c9c6"
              />
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default React.memo(HomeHeader, (prev, next) => {
  return (
    prev.caloriesProgress === next.caloriesProgress &&
    prev.proteinProgress === next.proteinProgress &&
    prev.carbsProgress === next.carbsProgress
  );
});

const styles = StyleSheet.create({
  viewer: {
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "40%",
    height: "100%",
  },
  counter: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "300",
    margin: "auto",
    width: "70%",
    alignSelf: "center",
  },
  premium: {
    alignItems: "center",
    alignContent: "center",
    right: "0%",
    width: 50,
    height: 50,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "white",
  },
  edit: {
    alignItems: "center",
    alignContent: "center",
    left: "0%",
    width: 50,
    height: 50,
    position: "absolute",
    overflow: "hidden",
    backgroundColor: "white",
  },
  header: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    overflow: "hidden",
    height: 40,
  },
  mainContainer: {
    height: 250,
    backgroundColor: "white",
    width: "100%",
    zIndex: 100,
    position: "relative",
    borderEndEndRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: "hidden",
  },
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "center",
    height: "100%",
  },
});
