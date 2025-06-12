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
import data from "@/testData"; // assuming you already have the initial data
import { foodType } from "@/app/types";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
const { API_URL } = Constants.expoConfig?.extra;

const Bookmark = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [foodList, setFoodList] = useState<foodType[]>(data); // Initialize with data
  const TabsSettings = useContext(TabsContext);

  // Function to fetch food items
  const getFood = useCallback(async () => {
    if (foodList.length === 0) {
      // Only fetch if foodList is empty
      setLoading(true);
      const res = await Get(API_URL + "/foods/consumed/read", {});
      if (res.ok === 1) {
        setFoodList(res.data || []);
      } else {
        setFoodList([]); // In case of error
        console.log("Error: " + res.message);
      }
      setLoading(false);
    }
  }, [foodList.length]); // Effect only if foodList is empty
  useEffect(() => {
    getFood();
  }, []);
  useEffect(() => {
    // Fetch data when the tab is accessed and `foodUpdate` changes
    getFood();
  }, [TabsSettings.foodUpdate]);

  // Handle render of food items
  const renderItem = ({ item }: { item: foodType }) => {
    return <FoodComponentStatic key={item.id} food={item} />;
  };

  return (
    <View style={{ position: "relative" }}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.edit}>
          <Image style={{ width: "60%", height: "60%" }} source={icons.edit} />
        </TouchableOpacity>
        <Text style={styles.title}>Daily Consumed Meals</Text>
        <View style={styles.premium}>
          <Image
            style={{ width: "60%", height: "60%" }}
            source={icons.premium}
          />
        </View>
      </View>

      <FlatList
        data={foodList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()} // Assuming `id` is a unique identifier for each item
        contentContainerStyle={styles.flatListContent}
        ListEmptyComponent={<Text>Empty List</Text>}
        ListHeaderComponent={
          <TouchableOpacity onPress={getFood}>
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
        onRefresh={getFood} // Pull-to-refresh functionality
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
