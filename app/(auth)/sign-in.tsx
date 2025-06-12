import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import icons from "../constants/icons";
import CustomButton from "../components/customButton";
import { Link, router } from "expo-router";
import { Modal, ActivityIndicator } from "react-native";
import { Image, ImageBackground } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "react-native/Libraries/NewAppScreen";
import LoadingComponent from "../components/loadingComponent";
import { Post } from "../services/api";
import { AuthProvider, AuthContext } from "../context/AuthProvider";

import Constants from "expo-constants";
import { ScrollView } from "react-native-gesture-handler";
import axios from "axios";

const { API_URL } = Constants.expoConfig?.extra;
const SignIn = () => {
  const AuthSettings = useContext(AuthContext);

  async function signIn(password: string, email: string) {
    console.log("d");
    console.log(API_URL + "/auth/sign-up");
    const ret = await Post(API_URL + "/auth/sign-in", {
      password: password,
      email: email,
    });
    console.log(ret);
    if (ret.ok == 1) {
      //save jwt
      console.log(ret);
      await AuthSettings.setUser(ret.data.user);
      await AuthSettings.setUserToken(ret.data.token);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${ret.data.token}`;
      //  router.push("/");
    }
  }
  useEffect(() => {
    console.log("distant change");
    console.log(AuthSettings.user);
  }, [AuthSettings.user]);

  const usernameInput = useRef<TextInput>(null);
  const emailInput = useRef<TextInput>(null);
  const passwordInput = useRef<TextInput>(null);
  const confirmPasswordInput = useRef<TextInput>(null);

  const [loading, setLoading] = useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [unPlaceholder, setUnPlaceholder] = useState<string>("Username");
  const [emPlaceholder, setEmPlaceholder] =
    useState<string>("email@example.com");
  const [psPlaceholder, setPsPlaceholder] = useState<string>("*********");
  const [cpsPlaceholder, setCpsPlaceholder] = useState<string>("*********");

  function handleUnFocus() {
    setUnPlaceholder("");
  }
  function handleUnUnfocus() {
    setUnPlaceholder("Username");
  }

  function handleEmFocus() {
    setEmPlaceholder("");
  }
  function handleEmUnfocus() {
    setEmPlaceholder("email@example.com");
  }

  function handlePsFocus() {
    setPsPlaceholder("");
  }
  function handlePsUnfocus() {
    setPsPlaceholder("*********");
  }

  function handleCpsFocus() {
    setCpsPlaceholder("");
  }
  function handleCpsUnfocus() {
    setCpsPlaceholder("*********");
  }

  function handleLink() {
    router.push("/");
  }
  function handleEmail(text: string) {
    if (text && text.length) {
      setEmail(text);
    }
  }
  function handleUsername(text: string) {
    if (text && text.length) {
      setUsername(text);
    }
  }
  function handlePassword(text: string) {
    if (text && text.length) {
      setPassword(text);
    }
  }
  function handleConfirmPassword(text: string) {
    if (text && text.length) {
      setConfirmPassword(text);
    }
  }
  const singupStyle = {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "#ee9d64",

    maxWidth: "45%",
    height: "70%",
    maxHeight: "70%",
    borderRadius: 7,
  };
  const submitStyle = {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    alignSelf: "center",
    backgroundColor: "#2860E9",
    width: "50%",
    maxWidth: "60%",
    minHeight: "5%",
    borderRadius: 7,
    marginTop: "20%",
    opacity: 1,
  };
  const textStyle = { color: "#F35D30", fontWeight: "bold", fontSize: 15 };
  const iconStyle = {
    maxHeight: "50%",
    maxWidth: "50%",
  };
  return (
    <LinearGradient
      colors={["#DED1CE", "#EE7854", "#F35D30"]} // RGB colors converted to hex
      locations={[0, 0, 0.5]} // Specifies the positions of the gradient stops (from 0% to 10%)
      start={[0.0, 0.0]} // Starting position of the gradient (0%, top left)
      end={[1.0, 1.0]} // Ending position of the gradient (135deg, bottom right)
      style={styles.container}
    >
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        {true /*loading*/ && (
          <LoadingComponent text={"Hold On A Second"} loading={loading} />
        )}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity onPress={handleLink} style={styles.link}>
            <View style={styles.buttonView}>
              <ImageBackground
                resizeMode="contain"
                source={icons.left}
                style={styles.backImage}
              ></ImageBackground>
            </View>
          </TouchableOpacity>

          <Text style={styles.titleStyle}>Create an{"\n"} account</Text>
          <Text style={styles.subTitleStyle}>Login In with</Text>
          <View style={styles.subContainer}>
            <CustomButton
              currentIcon={icons.google}
              title="Google"
              style={singupStyle}
              iconStyle={iconStyle}
              textStyle={textStyle}
            />
            <CustomButton
              currentIcon={icons.home}
              title="Linked-In"
              style={singupStyle}
              iconStyle={iconStyle}
              textStyle={textStyle}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.subOrTitleStyle}>Or with</Text>

            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Email</Text>
              <TextInput
                ref={emailInput}
                onFocus={handleEmFocus}
                onBlur={handleEmUnfocus}
                placeholderTextColor="#ff9b7c"
                style={styles.input}
                placeholder={emPlaceholder}
                keyboardType="email-address"
                value={email}
                onChangeText={handleEmail}
              />
            </View>

            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                ref={passwordInput}
                onFocus={handlePsFocus}
                onBlur={handlePsUnfocus}
                placeholderTextColor="#ff9b7c"
                style={styles.input}
                placeholder={psPlaceholder}
                keyboardType="default"
                value={password}
                onChangeText={handlePassword}
              />
            </View>
          </View>

          <CustomButton
            onPress={async () => {
              setLoading(true);
              await signIn(password, email);
              setLoading(false);
            }}
            disabled={loading}
            title="Login"
            style={submitStyle}
            textStyle={textStyle}
          />

          <Link href="/sign-up">Dont have An Account</Link>
        </ScrollView>
      </Pressable>
    </LinearGradient>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  backImage: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  },
  buttonView: {
    flex: 1,
    alignContent: "center",
    width: "60%",
    height: "60%",
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  titleStyle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 40,
    transform: "translateY(-100%)",
  },
  subTitleStyle: {
    color: "#595959",
    fontSize: 15,
    fontWeight: "700",
    transform: "translateY(-50%)",
  },
  subOrTitleStyle: {
    color: "#595959",
    fontSize: 15,
    fontWeight: "700",
    marginBottom: "5%",
    marginTop: "5%",
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    height: "100%",
    width: "100%",
  },
  subContainer: {
    alignItems: "center",
    justifyContent: "space-around",
    alignContent: "center",
    flexDirection: "row",
    width: "100%",
    height: "10%",
    overflow: "hidden",
  },
  form: {
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  textTempo: {
    position: "relative",
    width: "100%",
    height: "100%",
    backgroundColor: "red",
  },
  link: {
    position: "absolute",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "center",

    top: "5%",
    left: "5%",
    height: 30,
    width: 30,
    borderWidth: 1,
    borderRadius: 100,
    borderColor: "white",
    overflow: "hidden",
  },

  inputField: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    justifyContent: "center",
    textAlignVertical: "center",
  },
  inputLabel: {
    width: "30%",
    textAlignVertical: "center",
    color: "#ff9b7c",
  },
  input: {
    width: "50%",
    borderBottomWidth: 0.5,
    borderBottomColor: "#ff9b7c",
    color: "#ff9b7c",
  },
});
