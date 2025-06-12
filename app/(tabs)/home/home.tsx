import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from "react-native";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ScrollView } from "react-native-gesture-handler";
import HomeHeader from "./FoodComponents/HomeHeader";
import FoodComponent from "./FoodComponents/FoodComponent";
import { foodType, response } from "@/app/types";
import ExtraInfo from "./Info/ExtraInfo/ExtraInfo";
import { Get, Post } from "@/app/services/api";
import Constants from "expo-constants";
import LoadingComponent from "@/app/components/loadingComponent";
import data from "@/testData";
import icons from "@/app/constants/icons";
import { TabsContext } from "@/app/context/TabsProvider";
import Bookmark from "../bookmark/bookmark";
import Test from "./test";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const { API_URL } = Constants.expoConfig?.extra;
const Home = () => {
  const [status, setStatus] = useState<boolean>(false);
  const [removalAnimate, setRemovalAnimate] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [animatedStatus, setAnimatedStatus] = useState<boolean>(false);
  const [currentFood, setCurrentFood] = useState<foodType | null>(null);
  const [foodList, setFoodList] = useState<foodType[]>([]);
  const [caloriesProgress, setCaloriesProgress] = useState<number>(0);
  const [proteinProgress, setProteinProgress] = useState<number>(0);
  const [carbsProgress, setCarbsProgress] = useState<number>(0);

  const TabsSettings = useContext(TabsContext);
  async function getProgress() {
    const res = await Get(API_URL + "/progress/read", {});
    if (res.ok === 1) {
      setCaloriesProgress(res.data.calories_progress);
      setCarbsProgress(res.data.carbs_progress);
      setProteinProgress(res.data.protein_progress);
    } else {
    }
  }
  async function getFood() {
    setLoading(true);
    const res: response = await Get(API_URL + "/foods/read", {});
    if (res.ok === 1) {
      //initilize servings before mounting
      if (res.data && res.data.length)
        res.data.map((food: foodType) => {
          food["servings"] = 1;
        });
      setFoodList(res.data);
    } else {
      //
      setFoodList([]);
    }
    setLoading(false);
  }
  useEffect(() => {
    getFood();
    getProgress();
  }, []);

  useEffect(() => {
    getFood();
    getProgress();
  }, [TabsSettings.foodUpdate]);
  useEffect(() => {
    //realtime update
    if (currentFood) {
      setFoodList((prev) => {
        return [
          ...prev.slice(
            0,
            prev.findIndex((food: foodType) => food.id == currentFood.id)
          ),
          currentFood,
          ...prev.slice(
            prev.findIndex((food: foodType) => food.id == currentFood.id) + 1
          ),
        ];
      });
    }
  }, [currentFood]);
  useEffect(() => {
    setFoodList(data);
  }, []);
  useEffect(() => {
    console.log("status home");
    console.log(status);
  }, [status]);
  const renderFoodItem = useCallback(
    ({ item }: { item: foodType }) => (
      <FoodComponent
        key={item.id}
        food={item}
        setStatus={setStatus}
        setCurrentFood={setCurrentFood}
        setFoodList={setFoodList}
        setCarbsProgress={setCarbsProgress}
        setCaloriesProgress={setCaloriesProgress}
        setProteinProgress={setProteinProgress}
      />
    ),
    []
  );
  return (
    <View style={{ position: "relative" }}>
      {loading && <LoadingComponent loading={loading} text="Hold On" />}

      <ExtraInfo
        key={currentFood?.id + "currentfood"}
        id={currentFood?.id}
        status={status}
        protein={currentFood?.protein}
        carbs={currentFood?.carbs}
        calories={currentFood?.calories}
        setStatus={setStatus}
        portion={currentFood?.portion}
        name={currentFood?.name}
        setCurrentFood={setCurrentFood}
      />

      {/* <>
        <LottieView
          style={{
            width: screenWidth * 2,
            height: screenHeight * 2,
            position: "absolute",
            left: -screenWidth / 2,
            top: screenHeight / 2,
            opacity: removalAnimate ? 1 : 1,
            transform: [
              { translateY: -screenHeight },
              { translateX: -screenWidth },
            ],
            zIndex: 50,
            padding: 0,
          }}
          speed={2}
          autoPlay
          loop={true}
          source={animations.redot}
        />
        <LottieView
          speed={2}
          style={{
            width: screenWidth * 2,
            height: screenHeight * 2,
            position: "absolute",
            right: -screenWidth / 2,
            top: screenHeight / 2,
            opacity: removalAnimate ? 1 : 1,
            transform: [
              { translateY: -screenHeight },
              { translateX: screenWidth },
            ],
            zIndex: 50,
            padding: 0,
          }}
          autoPlay
          loop={true}
          source={animations.redot}
        />
      </>*/}
      {
        <HomeHeader
          caloriesProgress={caloriesProgress}
          proteinProgress={proteinProgress}
          carbsProgress={carbsProgress}
          setCaloriesProgress={setCaloriesProgress}
          setProteinProgress={setProteinProgress}
          setCarbsProgress={setCarbsProgress}
        />
      }
      <ScrollView
        style={{
          height: screenHeight,
          width: "100%",
          zIndex: 50000,
        }}
        contentContainerStyle={{
          justifyContent: "flex-start",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <TouchableOpacity onPress={getFood}>
          <Image
            style={{ width: 20, height: 20, marginTop: 5 }}
            source={icons.refresh}
          />
        </TouchableOpacity>
        {foodList && foodList.length > 0 ? (
          foodList.map((food: any) => {
            return (
              <FoodComponent
                key={food.id}
                food={food}
                setStatus={setStatus}
                setCurrentFood={setCurrentFood}
                setFoodList={setFoodList}
                setCarbsProgress={setCarbsProgress}
                setCaloriesProgress={setCaloriesProgress}
                setProteinProgress={setProteinProgress}
              />
            );
          })
        ) : (
          <Text>Empty List</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
