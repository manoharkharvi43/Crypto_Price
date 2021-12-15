import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import Home from "./src/Pages/Home/Home";
import { store } from "./src/Redux/Store/store";
import { NavigationContainer } from "@react-navigation/native";
import Root from "./src/Routes";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Root />
        {/* <NavigationContainer>
          <Root />
        </NavigationContainer> */}
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
