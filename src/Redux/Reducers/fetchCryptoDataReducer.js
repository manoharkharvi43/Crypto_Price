import {
  FETCH_CRYPTO_DATA,
  LOADING_END_AFTER_DATA_FETCH,
  LOADING_START_ON_DATA_FETCH,
} from "../Constants/Constants";

const initialState = {
  data: [],
  isLoading: false,
};
export const fetchCryptoDataReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case FETCH_CRYPTO_DATA:
      return {
        ...state,
        data: payload,
      };

    case LOADING_START_ON_DATA_FETCH:
      return {
        ...state,
        isLoading: true,
      };

    case LOADING_END_AFTER_DATA_FETCH:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};
