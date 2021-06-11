import React from "react";
import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
import "../../assets/download.png";
const { width, height } = Dimensions.get("window");
const ContainerForCrypto = ({
  name,
  shortName,
  oneDay,
  allTimeHigh,
  price,
  imageUrl,
  moneySymbol,
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          width: width,
          height: height * 0.1,
        },
      ]}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        style={[
          styles.image,
          {
            width: width * 0.15,
            height: height * 0.09,
          },
        ]}
      />
      <View
        style={{
          width: width * 0.82,
          height: "100%",
          flexDirection: "column",
        }}
      >
        <View
          style={[
            styles.container1,
            {
              width: width * 0.85,
              height: "50%",
            },
          ]}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            {name} |
            <Text
              style={{
                fontSize: 17,
                fontWeight: "bold",
                marginRight: 10,
                color: "black",
              }}
            >
              {" "}
              {shortName}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              marginRight: 10,
              color: "black",
              marginRight: 40,
            }}
          >
            {price} {moneySymbol === "usd" ? "$" : "₹"}
          </Text>
        </View>
        <View
          style={[styles.container2, { width: width * 0.85, height: "50%" }]}
        >
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            24H |{" "}
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color: oneDay < 0 ? "red" : "green",
              }}
            >
              {""}
              {oneDay}
            </Text>
          </Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              marginRight: 40,
            }}
          >
            ATH |{" "}
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                marginLeft: 10,
                color: "green",
              }}
            >
              {""}
              {allTimeHigh}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ContainerForCrypto;

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    paddingLeft: 5,
    flexDirection: "row",
    borderWidth: 0.1,
    elevation: 0.1,
    borderRadius: 1,
    alignItems: "center",
    borderColor: "#bababa",
    borderWidth: 0.2,
    marginBottom: 20,
    backgroundColor: "#f2f2f2",
  },
  image: {
    resizeMode: "cover",
    flex: 1,
  },
  container1: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "#dedede",
    borderBottomWidth: 0.2,
    alignItems: "center",
  },
  container2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
