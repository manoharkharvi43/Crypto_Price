import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
  Picker,
  ActivityIndicator,
} from "react-native";
import ContainerForCrypto from "../../Components/ContainerForCrypto";
import ClearIcon from "react-native-vector-icons/Entypo";
const { width, height } = Dimensions.get("window");
const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState("inr");
  const [loader, setLoader] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const getCryptoPrice = async (val) => {
    setLoader(true);
    await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${val}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "datatatat");
        setData(data);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setLoader(false);
      });
  };

  const filterData = (text) => {
    console.log(text);
    const newData = data.filter((item) => {
      const itemData = item.symbol.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
  };

  const refreshData = async () => {
    setLoading(true);
    await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=100&page=1&sparkline=false",
      {
        method: "GET",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const renderItem = ({ item }) => {
    return (
      <ContainerForCrypto
        name={item.name}
        shortName={item.symbol}
        price={item.current_price.toFixed(2)}
        oneDay={item.price_change_percentage_24h.toFixed(4)}
        allTimeHigh={item.ath.toFixed(2)}
        imageUrl={item.image}
        moneySymbol={selectedValue}
      />
    );
  };
  useEffect(() => {
    getCryptoPrice("inr");
  }, []);
  return (
    <View
      style={{
        paddingHorizontal: 10,
        width: width,
        marginTop: 20,
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      {!loader ? (
        <View>
          <View
            style={{
              width: width,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              height: 100,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                position: "relative",
                height: 40,
                width: width * 0.6,
              }}
            >
              <TextInput
                placeholder="Search"
                style={{
                  borderColor: "black",
                  borderWidth: 0.5,
                  height: 40,
                  width: width * 0.6,
                  borderRadius: 15,
                  marginBottom: 10,
                }}
                onChangeText={(text) => {
                  filterData(text);
                  setSearchValue(text);
                }}
              />
              {searchValue ? (
                <ClearIcon
                  name="cross"
                  size={20}
                  color="black"
                  style={{
                    position: "absolute",
                    alignSelf: "center",
                    right: 0,
                    marginRight: 10,
                  }}
                  onPress={() => {
                    setSearchValue("");
                    getCryptoPrice("inr");
                  }}
                />
              ) : null}
            </View>

            <Picker
              selectedValue={selectedValue}
              style={{
                height: 50,
                width: 150,
                borderColor: "grey",
                borderWidth: 0.4,
                elevation: 0.5,
              }}
              onValueChange={(itemValue, itemIndex) => {
                getCryptoPrice(itemValue);
                setSelectedValue(itemValue);
              }}
            >
              <Picker.Item label="INR" value="inr" />
              <Picker.Item label="USD" value="usd" />
            </Picker>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onRefresh={refreshData}
            refreshing={loading}
          />
        </View>
      ) : (
        <View
          style={{
            width: width,
            height: height,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <ActivityIndicator color="dodgerblue" size={40} />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
