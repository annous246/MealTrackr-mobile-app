import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import MyBarChart from "./MyBarChart";
import AnalyticPod from "./AnalyticPod";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import BottomLineController from "./BottomLineController";
import { Post } from "@/app/services/api";
import Constants from "expo-constants";
import { notificationContext } from "@/app/context/NotificationProvider";
import LoadingComponent from "@/app/components/loadingComponent";

const screenHeight = Dimensions.get("window").height;
const { API_URL } = Constants.expoConfig?.extra;
const Analytics = () => {
  const opacityValue = useSharedValue(1);
  const NotificationSettings = useContext(notificationContext);
  const [macros, setMacros] = useState<string[]>([
    "Calories",
    "Protein",
    "Carbs",
  ]);
  const [period, setPeriod] = useState<string[]>([
    "Daily",
    "Weekly",
    "Monthly",
    "Yearly",
  ]);

  const [caloriesDataDaily, setCaloriesDataDaily] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [caloriesDataWeekly, setCaloriesDataWeekly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [caloriesDataMonthly, setCaloriesDataMonthly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [caloriesDataYearly, setCaloriesDataYearly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [proteinDataDaily, setProteinDataDaily] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [proteinDataWeekly, setProteinDataWeekly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [proteinDataMonthly, setProteinDataMonthly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [proteinDataYearly, setProteinDataYearly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [carbsDataDaily, setCarbsDataDaily] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [carbsDataWeekly, setCarbsDataWeekly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [carbsDataMonthly, setCarbsDataMonthly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });

  const [carbsDataYearly, setCarbsDataYearly] = useState<object>({
    labels: [],
    datasets: [
      {
        data: [],
        colors: [],
      },
    ],
  });
  const [data, setData] = useState<object>({
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        data: [30, 45, 28, 80, 99],
        colors: [
          () => "#3B82F6",
          () => "#3B82F6",
          () => "#3B82F6",
          () => "#3B82F6",
          () => "#3B82F6",
        ],
      },
    ],
  });

  const [dataReady, setDataReady] = useState<boolean>(false);
  const [currentMacro, setCurrentMacro] = useState<string>(macros[0]);
  const [currentPeriod, setCurrentPeriod] = useState<string>(period[0]);
  const [loading, setLoading] = useState<boolean>(false);
  function dailyHasher(res: any) {
    let labels: string[] = [];
    let datasets = [{ data: [], colors: [] }];
    for (let key in res.data.daily) {
      const date = new Date(key);
      const dayName = date.toLocaleDateString("en-US", {
        weekday: "short",
      });
      labels.push(dayName);
      datasets[0].data.push(res.data.daily[key].sum);
      datasets[0].colors.push(() => "#3B82F6");
    }

    labels = labels.reverse();
    datasets[0].data = datasets[0].data.reverse();

    return { labels: labels, datasets: datasets };
  }

  function yearlyHasher(res: any) {
    let labels: string[] = [];
    let datasets = [{ data: [], colors: [] }];
    for (let key in res.data.yearly) {
      labels.push(key);
      datasets[0].data.push(res.data.yearly[key].sum);
      datasets[0].colors.push(() => "#3B82F6");
    }

    return { labels: labels, datasets: datasets };
  }

  function weeklyHasher(res: any) {
    let labels: string[] = [];
    let datasets = [{ data: [], colors: [] }];
    for (let key in res.data.weekly) {
      labels.push(key);
      console.log(res.data.weekly[key]);
      datasets[0].data.push(res.data.weekly[key].sum);
      datasets[0].colors.push(() => "#3B82F6");
    }

    labels = labels.reverse();
    datasets[0].data = datasets[0].data.reverse();

    return { labels: labels, datasets: datasets };
  }

  function monthlyHasher(res: any) {
    let labels: string[] = [];
    let datasets = [{ data: [], colors: [] }];
    for (let key in res.data.monthly) {
      const date = new Date(
        2000,
        parseInt(key.slice(key.length - 2, key.length)) - 1
      ); // JS months: 0–11
      const short = date.toLocaleString("en-US", { month: "short" });
      labels.push(short);
      datasets[0].data.push(res.data.monthly[key].sum);
      datasets[0].colors.push(() => "#3B82F6");
    }

    labels = labels.reverse();
    datasets[0].data = datasets[0].data.reverse();

    return { labels: labels, datasets: datasets };
  }
  async function pullAnalytics(macro: string) {
    setDataReady(false);
    const macroapilink = macro.charAt(0).toLowerCase() + macro.slice(1);
    console.log("pull");
    setLoading(true);
    const res: any = await Post(
      API_URL + `/progress/${macroapilink}_metrics`,
      {}
    );

    setLoading(false);
    console.log(res);
    if (res.ok === 1) {
      console.log(res.data.daily);
      for (let key in res.data.daily) {
        console.log("key" + res.data.daily[key].sum);
      }

      switch (macro) {
        case "Calories":
          setCaloriesDataDaily((prev) => {
            return dailyHasher(res);
          });
          setCaloriesDataWeekly((prev) => {
            console.log("weekly");
            console.log(weeklyHasher(res).datasets[0].data);
            return weeklyHasher(res);
          });
          setCaloriesDataMonthly((prev) => {
            return monthlyHasher(res);
          });
          setCaloriesDataYearly((prev) => {
            return yearlyHasher(res);
          });

          break;
        case "Protein":
          setProteinDataDaily((prev) => {
            return dailyHasher(res);
          });
          setProteinDataWeekly((prev) => {
            return weeklyHasher(res);
          });
          setProteinDataMonthly((prev) => {
            return monthlyHasher(res);
          });
          setProteinDataYearly((prev) => {
            return yearlyHasher(res);
          });

          break;
        case "Carbs":
          setCarbsDataDaily((prev) => {
            return dailyHasher(res);
          });
          setCarbsDataWeekly((prev) => {
            return weeklyHasher(res);
          });
          setCarbsDataMonthly((prev) => {
            return monthlyHasher(res);
          });
          setCarbsDataYearly((prev) => {
            return yearlyHasher(res);
          });

          break;
      }

      opacityValue.value = withTiming(1, { duration: 200 });
      NotificationSettings.notify(res.message, 0);

      setDataReady(true);
    } else {
      NotificationSettings.notify(res.message, 2);
    }
  }

  function getData() {
    switch (currentMacro) {
      case "Calories":
        switch (currentPeriod) {
          case "Weekly":
            return caloriesDataWeekly;

          case "Monthly":
            return caloriesDataMonthly;

          case "Yearly":
            return caloriesDataYearly;

          case "Daily":
            return caloriesDataDaily;
        }
        break;
      case "Carbs":
        switch (currentPeriod) {
          case "Weekly":
            return carbsDataWeekly;

          case "Monthly":
            return carbsDataMonthly;

          case "Yearly":
            return carbsDataYearly;

          case "Daily":
            return carbsDataDaily;
        }
        break;
      case "Protein":
        switch (currentPeriod) {
          case "Weekly":
            return proteinDataWeekly;

          case "Monthly":
            return proteinDataMonthly;

          case "Yearly":
            return proteinDataYearly;

          case "Daily":
            return proteinDataDaily;
        }
        break;
    }
  }

  function getTotal() {
    switch (currentMacro) {
      case "Calories":
        switch (currentPeriod) {
          case "Weekly":
            return caloriesDataWeekly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Monthly":
            return caloriesDataMonthly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Yearly":
            return caloriesDataYearly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Daily":
            return caloriesDataDaily.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );
        }
        break;
      case "Carbs":
        switch (currentPeriod) {
          case "Weekly":
            return carbsDataWeekly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Monthly":
            return carbsDataMonthly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Yearly":
            return carbsDataYearly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Daily":
            return carbsDataDaily.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );
        }
        break;
      case "Protein":
        switch (currentPeriod) {
          case "Weekly":
            return proteinDataWeekly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Monthly":
            return proteinDataMonthly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Yearly":
            return proteinDataYearly.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );

          case "Daily":
            return proteinDataDaily.datasets[0].data.reduce(
              (acc, val) => acc + val,
              0
            );
        }
        break;
    }
  }
  function getAverage() {
    switch (currentPeriod) {
      case "Weekly":
        return getTotal() / 4;

      case "Monthly":
        return getTotal() / 12;

      case "Yearly":
        return getTotal() / 5;

      case "Daily":
        return getTotal() / 7;
      default:
        return 0;
    }
  }
  function annotate() {
    if (currentMacro == "Calories") return "Kcal";
    return "g";
  }
  useEffect(() => {
    pullAnalytics(currentMacro);
    const p = getData();
  }, [currentMacro]);

  const opacityAnimate = useAnimatedStyle(() => {
    return { opacity: opacityValue.value };
  });

  useEffect(() => {
    console.log(caloriesDataDaily);
  }, [caloriesDataDaily]);
  return (
    <View style={{ height: "100%", paddingTop: 100 }}>
      <LoadingComponent
        loading={loading}
        text={`Pulling ${currentMacro} Analytics`}
      />
      <BottomLineController
        position={"top"}
        buttons={macros}
        setButton={setCurrentMacro}
      />
      <Animated.ScrollView
        contentContainerStyle={styles.container}
        style={[opacityAnimate, { height: screenHeight }]}
      >
        <Text
          style={{
            textAlign: "center",
            fontWeight: 300,
            fontSize: 25,
            color: "#3B82F6",
          }}
        >
          My {currentMacro} Analytics {"\n"} ({annotate()})
        </Text>
        <ScrollView
          horizontal
          style={{
            width: "100%",
            overflow: "scroll",
          }}
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          {dataReady && <MyBarChart data={getData(currentPeriod)} />}
        </ScrollView>
        {currentPeriod != "Daily" && dataReady && (
          <View
            style={{
              marginBottom: 100,
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <AnalyticPod
              title={currentPeriod + " Average"}
              value={getAverage().toFixed(2) + " " + annotate()}
            />
            <AnalyticPod
              title={currentPeriod + " Total"}
              value={getTotal().toFixed(2) + " " + annotate()}
            />
          </View>
        )}
      </Animated.ScrollView>
      <BottomLineController
        position={"bottom"}
        buttons={period}
        setButton={setCurrentPeriod}
      />
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
