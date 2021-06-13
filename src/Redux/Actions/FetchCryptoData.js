import { FETCH_CRYPTO_DATA } from "../Constants/Constants";
import {
  loadingEndAfterDataFetch,
  loadingStartOnFetchData,
} from "./LoaderOnFetch";

export const fetchCryptoData =
  (currency, getLoader = true) =>
  async (dispatch) => {
    getLoader && dispatch(loadingStartOnFetchData());
    try {
      await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch({
            type: FETCH_CRYPTO_DATA,
            payload: data,
          });
          getLoader && dispatch(loadingEndAfterDataFetch());
        });
    } catch (err) {
      getLoader && dispatch(loadingEndAfterDataFetch());
    }
  };
