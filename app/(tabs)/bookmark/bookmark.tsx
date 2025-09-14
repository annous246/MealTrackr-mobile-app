import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  View,
  Dimensions,
} from "react-native";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { TabsContext } from "@/app/context/TabsProvider";
import Constants from "expo-constants";
import icons from "@/app/constants/icons";
import FoodComponentStatic from "./FoodComponentStatic";

import { foodType } from "@/app/types";
import { notificationContext } from "@/app/context/NotificationProvider";
import { Get } from "@/app/services/api";
import DatePicker from "../home/FoodComponents/DateControl/DatePicker";
import { DateContext } from "@/app/context/DateProvider";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const { API_URL } = Constants.expoConfig?.extra;

const Bookmark = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [foodList, setFoodList] = useState<foodType[]>([]); // Initialize with data
  const TabsSettings = useContext(TabsContext);
  const DateSettings = useContext(DateContext);

  const NotificationSettings = useContext(notificationContext);
  // Function to fetch food items
  const getFood = useCallback(async () => {
    setLoading(true);
    const res = await Get(API_URL + "/foods/consumed/read", {});
    if (res.ok === 1) {
      setFoodList(res.data || []);
      NotificationSettings.notify(res.message, 0);
    } else {
      setFoodList([]); // In case of error
      console.log("Error: " + res.message);
      NotificationSettings.notify(res.message, 2);
    }
    setLoading(false);
  }, [foodList.length]); // Effect only if foodList is empty

  const getPreviouslyConsumed = async (
    day: number,
    year: number,
    month: number
  ) => {
    setLoading(true);
    const res = await Get(API_URL + "/foods/consumed/readPast", {
      params: { day: day, month: month, year: year },
    });
    if (res.ok === 1) {
      setFoodList(res.data || []);
      NotificationSettings.notify(res.message, 0);
    } else {
      setFoodList([]); // In case of error
      console.log("Error: " + res.message);
      NotificationSettings.notify(res.message, 2);
    }
    console.log(res);
    setLoading(false);
  };
  useEffect(() => {
    getFood();
  }, []);
  useEffect(() => {
    // Fetch data when the tab is accessed and `foodUpdate` changes
    getFood();
  }, [TabsSettings.foodUpdate]);

  async function getFoods() {
    if (DateSettings.currentDate.getDate() == new Date().getDate()) {
      await getFood();
    } else {
      await getPreviouslyConsumed(
        DateSettings.currentDate.getDate(),
        DateSettings.currentDate.getFullYear(),
        DateSettings.currentDate.getMonth() + 1
      );
    }
  }
  useEffect(() => {
    //if changed pull
    getFoods();
  }, [DateSettings.currentDate]);

  // Handle render of food items
  const renderItem = ({ item }: { item: foodType }) => {
    return <FoodComponentStatic key={item.id} food={item} />;
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={styles.header}>
        <Text style={styles.title}>Daily Consumed Meals</Text>
        <View style={styles.premium}>
          <Image
            style={{ width: "60%", height: "60%" }}
            source={icons.premium}
          />
        </View>
      </View>
      <DatePicker disabled={false} />

      <FlatList
        data={foodList}
        style={{ height: screenHeight - 310 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Assuming `id` is a unique identifier for each item
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={<Text>Empty List</Text>}
        ListHeaderComponent={
          <TouchableOpacity onPress={getFoods}>
            <Image
              style={{ width: 20, height: 20, marginTop: 5 }}
              source={icons.refresh}
            />
          </TouchableOpacity>
        }
        initialNumToRender={5} // Render a small number initially
        windowSize={7} // Adjust this for smoother scrolling
        maxToRenderPerBatch={5} // Control the maximum number of items rendered in a batch
        onEndReachedThreshold={0.1} // Trigger `onEndReached` when the end is 10% away
        onEndReached={() => {
          // You could trigger additional fetch here if needed
        }}
        refreshing={loading}
        onRefresh={getFoods} // Pull-to-refresh functionality
      />
    </View>
  );
};

export default Bookmark;

const styles = StyleSheet.create({
  header: {
    display: "flex",
    alignContent: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: "white",
    height: 40,
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
    position: "absolute",
    right: "0%",
    width: 50,
    height: 50,
    overflow: "hidden",
    backgroundColor: "white",
  },
  edit: {
    alignItems: "center",
    position: "absolute",
    left: "0%",
    width: 50,
    height: 50,
    overflow: "hidden",
    backgroundColor: "white",
  },
  flatListContent: {
    justifyContent: "flex-start",
    alignItems: "center",
    alignContent: "center",
  },
});
