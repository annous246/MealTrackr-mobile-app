import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { StepperContext } from "./StepperProvider";

interface AuthContextSettingsInterface {
  user?: any;
  setUser: any;
  userToken: any;
  setUserToken: any;
}
const AuthContext = createContext<AuthContextSettingsInterface>({
  user: null,
  setUser: null,
  userToken: null,
  setUserToken: null,
});

// headers: { Authorization: userToken }
interface AuthContextInterface {
  children: any;
}

const AuthProvider = (props: AuthContextInterface) => {
  const [userToken, setUserToken] = useState<any | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const StepperSettings = useContext(StepperContext);
  async function initilizer() {
    const localUser = await AsyncStorage.getItem("user");
    const localUserToken = await AsyncStorage.getItem("userToken");
    setUser(JSON.parse(localUser ?? null));
    setUserToken(localUserToken);
  }
  useEffect(() => {
    /*azdaz*/
    initilizer();
  }, []);

  async function saveToken(token: any, user: any) {
    if (!token) {
      await AsyncStorage.removeItem("userToken");
      await AsyncStorage.removeItem("user");
      return;
    } else {
      console.log(user);
      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
    }
  }

  async function clearStorage() {
    await AsyncStorage.clear();
  }
  useEffect(() => {
    //45
    console.log(userToken);
    if (!userToken) {
      //logged out or expired

      //delete token and user
      console.log("signed nullified");
      saveToken(null, null);
      //clear the rest of attributes
      clearStorage();
      router.push("/");
    } else {
      //logged in
      console.log("signed************************************************");
      saveToken(userToken, user);
      if (user) StepperSettings.setStepper(user.stepper);
      router.push("/(tabs)/create");
    }
  }, [userToken]);
  useEffect(() => {
    if (user && userToken) {
      saveToken(userToken, user);
    }
  }, [user]);

  return (
    <AuthContext.Provider
      value={{
        user: user,
        setUser: setUser,
        userToken: userToken,
        setUserToken: setUserToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const styles = StyleSheet.create({});
export { AuthContext, AuthProvider };
