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
import { Get, Post } from "../services/api";
import { ScrollView } from "react-native-gesture-handler";
import Constants from "expo-constants";
import { notificationContext } from "../context/NotificationProvider";

const { API_URL } = Constants.expoConfig?.extra;
const SignUp = () => {
  const NotificationSettings = useContext(notificationContext);
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

  async function signup(
    password: string,
    confirmPassword: string,
    email: string,
    username: string
  ) {
    console.log("here");
    const ret = await Post(API_URL + "/auth/sign-up", {
      password: password,
      confirmPassword: confirmPassword,
      email: email,
      username: username,
    });
    console.log("ret");
    console.log(ret);
    if (ret.ok == 1) {
      router.push("/sign-in");
      NotificationSettings.notify(ret.message, 0);
    } else NotificationSettings.notify(ret.message, 2);
  }
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
    setEmail(text);
  }
  function handleUsername(text: string) {
    setUsername(text);
  }
  function handlePassword(text: string) {
    setPassword(text);
  }
  function handleConfirmPassword(text: string) {
    setConfirmPassword(text);
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
      style={styles.mainContainer}
    >
      <Pressable onPress={Keyboard.dismiss} style={styles.container}>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={{
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {true /*loading*/ && (
            <LoadingComponent text={"Hold On A Second"} loading={loading} />
          )}
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
          <Text style={styles.subTitleStyle}>Sign up with</Text>
          <View style={styles.subContainer}>
            <CustomButton
              onPress={() => {} /*promptAsync()*/}
              currentIcon={icons.google}
              title={"Google \n (soon)"}
              style={singupStyle}
              iconStyle={iconStyle}
              textStyle={textStyle}
              disabled={true}
            />
            <CustomButton
              currentIcon={icons.home}
              title={"Linked-In \n (soon)"}
              style={singupStyle}
              iconStyle={iconStyle}
              textStyle={textStyle}
              disabled={true}
            />
          </View>

          <View style={styles.form}>
            <Text style={styles.subOrTitleStyle}>Or with</Text>
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Username</Text>
              <TextInput
                ref={usernameInput}
                onFocus={handleUnFocus}
                onBlur={handleUnUnfocus}
                placeholderTextColor="#ff9b7c"
                style={styles.input}
                placeholder={unPlaceholder}
                keyboardType="default"
                value={username}
                onChangeText={handleUsername}
              />
            </View>

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
                secureTextEntry={true}
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
            <View style={styles.inputField}>
              <Text style={styles.inputLabel}>Confirm Password</Text>

              <TextInput
                secureTextEntry={true}
                ref={confirmPasswordInput}
                onFocus={handleCpsFocus}
                onBlur={handleCpsUnfocus}
                placeholderTextColor="#ff9b7c"
                style={styles.input}
                placeholder={cpsPlaceholder}
                keyboardType="default"
                value={confirmPassword}
                onChangeText={handleConfirmPassword}
              />
            </View>
          </View>

          <CustomButton
            onPress={async () => {
              setLoading(false);
              await signup(password, confirmPassword, email, username);
              setLoading(false);
            }}
            disabled={loading}
            title="Register"
            style={submitStyle}
            textStyle={textStyle}
          />
          <Link href="/sign-in">Already Have An Account</Link>
        </ScrollView>
      </Pressable>
    </LinearGradient>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  backImage: {
    width: "100%",
    height: "100%",
    borderRadius: "100%",
  },
  scrollContainer: {
    width: "100%",
    height: "100%",
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
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    alignContent: "center",
    flexDirection: "column",
    height: "100%",
    width: "100%",
  },
  mainContainer: {
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
    height: 50,
  },
});
