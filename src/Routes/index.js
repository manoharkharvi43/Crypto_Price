import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../Pages/Home/Home";

const Stack = createStackNavigator();

const Root = () => {
  return (
    // <Stack.Navigator initialRouteName="home">
    //   <Stack.Screen name="home" component={Home}></Stack.Screen>
    // </Stack.Navigator>

    <Home />
  );
};

export default Root;
