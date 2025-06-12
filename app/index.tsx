import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import icons from "./constants/icons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
const App = () => {
  const [logged, setLogged] = useState<Boolean>(false);
  async function initilize() {
    const val = await AsyncStorage.getItem("userToken");
    console.log("val");
    console.log(val);
    setLogged(val != null);
    //8njknkn
  }
  useEffect(() => {
    initilize();
  }, []);
  function handlePress() {
    router.push("/sign-in");
  }
  const translate = useRef(new Animated.Value(-100)).current;
  const opacityIn = useRef(new Animated.Value(0)).current;
  const mainTitle = useRef<Text>(null);
  useEffect(() => {
    Animated.timing(translate, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacityIn, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
    //console.log("hi");
    // if (mainTitle.current ) console.log(mainTitle.current.validAttributes);
    // setTimeout(() => (mainTitle.current.props.style.opacity = 1));
  }, []);
  return (
    <ScrollView contentContainerStyle={{ height: "100%" }}>
      <View style={styles.appContainer}>
        {/*animated view*/}
        <Animated.View
          style={[styles.mainlogo, { transform: [{ translateY: translate }] }]}
        >
          <Image style={styles.logo} resizeMode="contain" source={icons.logo} />
          <Animated.Text
            ref={mainTitle}
            style={{ ...styles.logotext, opacity: opacityIn }}
          >
            Coffee
          </Animated.Text>
        </Animated.View>

        <TouchableOpacity onPress={handlePress} style={styles.button}>
          <Text style={{ color: "white" }}>
            {!logged ? "Login With Email" : "Logged In"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default App;
///anass@gmail.com
const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F3F6F6",
  },
  logotext: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#f35d30",
  },
  logo: {
    width: 100,
    height: 100,
  },
  text: {
    width: 100,
    height: 100,
  },
  mainlogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    maxHeight: "50%",
  },
  button: {
    padding: 10,
    paddingInline: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#f35d30",
    backgroundColor: "#f35d30",
  },
});
