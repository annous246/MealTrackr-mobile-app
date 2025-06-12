import { StyleSheet, Text, View } from "react-native";
import React, { Children, createContext, useState } from "react";
interface tabsContextType {
  foodUpdate: boolean;
  setFoodUpdate: any;
}

const TabsContext = createContext<tabsContextType>({
  foodUpdate: true,
  setFoodUpdate: null,
});
const TabsProvider = ({ children }: { children: any }) => {
  const [foodUpdate, setFoodUpdate] = useState<boolean>(true);

  return (
    <TabsContext.Provider value={{ foodUpdate, setFoodUpdate }}>
      {children}
    </TabsContext.Provider>
  );
};

export { TabsProvider, TabsContext };

const styles = StyleSheet.create({});
