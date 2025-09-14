import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";

const { height: screenHeight, width: screenWidth } = Dimensions.get("window");
const BottomLineController = ({
  position,
  buttons,
  setButton,
}: {
  buttons: string[];
  setButton: any;
  position: string;
}) => {
  function handle(val: string) {
    {
      setButton(val);
      setActive(val);
    }
  }
  const [active, setActive] = useState<string>(buttons[0]);
  return (
    <View
      style={[
        {
          position: "absolute",
          left: 0,
          right: 0,
          height: 60,
          backgroundColor: "transparent",
          width: screenWidth,
          alignContent: "center",
          alignItems: "center",
        },
        position == "top" ? styles.top : styles.bottom,
      ]}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          flexDirection: "row",
          justifyContent: "space-evenly",
          padding: 10,
          width: "90%",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {buttons.map((val: string, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              style={{
                ...styles.button,
                backgroundColor:
                  active == val ? "rgba(52, 73, 235,0.5)" : "transparent",
              }}
              onPress={() => handle(val)}
            >
              <Text>{val}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default React.memo(BottomLineController);

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  top: {
    top: 10,
  },
  bottom: {
    bottom: 0,
  },
});
