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
import SearchIcon from "react-native-vector-icons/AntDesign";
import { fetchCryptoData } from "../../Redux/Actions/FetchCryptoData";
import { connect, useDispatch } from "react-redux";
const { width, height } = Dimensions.get("window");
const Home = ({ cryptoData, isLoading }) => {
  const [data, setData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("inr");
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();
  const getCryptoPrice = (val) => {
    dispatch(fetchCryptoData(val));
  };

  const filterData = (text) => {
    console.log(text);
    if (text) {
      const newData = cryptoData.filter((item) => {
        const itemData = item.symbol.toUpperCase();
        const textData = text.toUpperCase();
        if (itemData.includes(textData)) {
          return item;
        }
      });
      setData(newData);
      console.log(newData.length, "new");
    } else {
      setData(cryptoData);
    }
  };
  const refreshData = async () => {
    setSelectedValue("inr");
    dispatch(fetchCryptoData("inr", false));
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
    if (cryptoData) {
      setData(cryptoData);
    }
  }, [cryptoData]);
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
      {!isLoading ? (
        <View>
          <View
            style={{
              width: width,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
          >
            <View
              style={{
                width: width * 0.6,
                borderRadius: 15,
                flexDirection: "row",
                borderColor: "black",
                borderWidth: 0.2,
                justifyContent: "center",
                alignItems: "center",
                height: 40,
                elevation: 1,
                position: "relative",
              }}
            >
              <SearchIcon
                name="search1"
                size={25}
                color="#949494"
                style={{
                  marginLeft: 30,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  height: 40,
                  width: width * 0.6,
                }}
              >
                <TextInput
                  placeholder={"Search"}
                  style={{
                    height: 40,
                    width: width * 0.6,
                  }}
                  onChangeText={(text) => {
                    filterData(text);
                    setSearchValue(text);
                  }}
                />
                {searchValue ? (
                  <ClearIcon
                    name="circle-with-cross"
                    size={22}
                    color="grey"
                    style={{
                      position: "absolute",
                      alignSelf: "center",
                      right: 25,
                      marginRight: 10,
                    }}
                    onPress={() => {
                      setSearchValue("");
                      getCryptoPrice("inr");
                    }}
                  />
                ) : null}
              </View>
            </View>

            <View
              style={{
                height: 40,
                width: 100,
                borderColor: "grey",
                borderWidth: 0.4,
                elevation: 0.5,
                marginRight: 30,
                borderRadius: 10,
                justifyContent: "center",
              }}
            >
              <Picker
                selectedValue={selectedValue}
                onValueChange={(itemValue, itemIndex) => {
                  dispatch(fetchCryptoData(itemValue));
                  setSelectedValue(itemValue);
                }}
              >
                <Picker.Item label="INR" value="inr" />
                <Picker.Item label="USD" value="usd" />
              </Picker>
            </View>
          </View>
          <FlatList
            data={data}
            keyExtractor={(item) => item.id}
            renderItem={renderItem}
            onRefresh={refreshData}
            refreshing={isLoading}
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

const mapStateToProps = (state) => {
  return {
    cryptoData: state.fetchCryptoDataReducer.data,
    isLoading: state.fetchCryptoDataReducer.isLoading,
  };
};
export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({});
