import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import DayStub from "./DayStub";
import { ScrollView } from "react-native-gesture-handler";
import { DateContext } from "@/app/context/DateProvider";

const DatePicker = ({ disabled }: { disabled: boolean }) => {
  const [dateList, setDateList] = useState<Date[]>([]);
  const DateSettings = useContext(DateContext);
  function getPreviousDates(d: Date): Date[] {
    let res = [];
    let workingDate = new Date(d);
    for (let p = 7; p > 0; p--) {
      res.push(new Date(workingDate));
      workingDate.setDate(workingDate.getDate() - 1);
    }
    res = res.reverse();
    return res;
  }
  useEffect(() => {
    setDateList(getPreviousDates(new Date()));
  }, []);
  useEffect(() => {}, [DateSettings.currentDate]);
  return (
    <View
      style={{
        flexDirection: "row",
        height: "30%",
        maxHeight: "30%",
        width: "100%",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "space-evenly",
      }}
    >
      {dateList &&
        dateList.length > 0 &&
        dateList.map((date: Date) => {
          const day = date.toLocaleDateString("en-US", { weekday: "short" });
          return (
            <DayStub
              key={date.toISOString()}
              disabled={disabled}
              title={day}
              number={date.getDate()}
              onPress={() => DateSettings.setCurrentDate(date)}
              status={DateSettings.currentDate.getDate() == date.getDate()}
            />
          );
        })}
    </View>
  );
};

export default DatePicker;

const styles = StyleSheet.create({});
