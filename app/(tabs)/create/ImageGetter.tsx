import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import CustomButton from "@/app/components/customButton";
import icons from "@/app/constants/icons";
import * as ImagePicker from "expo-image-picker";
import { notificationContext } from "@/app/context/NotificationProvider";
import Constants from "expo-constants";
import { Post } from "@/app/services/api";
import axios from "axios";

const { API_URL } = Constants.expoConfig?.extra;
const ImageGetter = ({
  setKcal,
  setFoodName,
  setProtein,
  setCarbs,
  setLoading,
  setPortion,
}: {
  setKcal: any;
  setFoodName: any;
  setProtein: any;
  setCarbs: any;
  setLoading: any;
  setPortion: any;
}) => {
  const NotificationSettings = useContext(notificationContext);
  function parseWeirdDataString(dataString: string) {
    // 1. Wrap keys with double quotes
    let jsonStr = dataString.replace(/(\w+):/g, '"$1":');
    // 2. Replace all single quotes with double quotes
    jsonStr = jsonStr.replace(/'/g, '"');
    // 3. Parse JSON string
    return JSON.parse(jsonStr);
  }
  const uploadImage = async (photo: object) => {
    try {
      console.log(photo);
      const formData = new FormData();

      // Append photo file to formData
      formData.append("image", {
        uri: photo.uri,
        name: "photo.jpg",
        type: "image/jpg",
      } as any);

      // Replace with your backend URL
      let res = null;
      // res = await Post(API_URL + "/foods/upload", {});
      setLoading(true);
      res = await axios.post(API_URL + "/foods/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const rs = res.data;
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log("rs");
      console.log(rs);
      if (res.data.ok) {
        /*
        let parsed = {};
        try {
          parsed = JSON.parse(rs.data);
        } catch (e) {
          parsed = rs.data;
        }*/

        NotificationSettings.notify(res.data.message, 0);
        const parsed = JSON.parse(res.data.data);
        setFoodName(parsed["food_name"]);
        setCarbs(parsed["carbs"].toString());
        setProtein(parsed["protein"].toString());
        setPortion(parsed["portion"].toString());
        setKcal(parsed["calories"].toString());
      }
      setLoading(false);
    } catch (error) {
      NotificationSettings.notify("Upload failed", 2);
      console.error(error.message + " " + error.stack);
      setLoading(false);
    }
  };
  const takePicture = async () => {
    // Request permissions
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access camera is required!");
      return;
    }

    // Launch camera
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
      base64: false,
    });

    if (result && !result.canceled) {
      await uploadImage(result.assets[0]);
    } else {
      console.log("canceled");
    }
  };
  return (
    <CustomButton
      onPress={takePicture}
      style={{
        borderWidth: 1,
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
        borderRadius: 5,
        backgroundColor: "rgba(52, 131, 235,0.5)",
      }}
      title="Upload Dish Photo"
      textStyle={{ color: "white" }}
      currentIcon={icons.camera}
      iconStyle={{ width: 50, height: 50, tintColor: "white" }}
    />
  );
};

export default ImageGetter;

const styles = StyleSheet.create({});
