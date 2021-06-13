import {
  LOADING_END_AFTER_DATA_FETCH,
  LOADING_START_ON_DATA_FETCH,
} from "../Constants/Constants";

export const loadingStartOnFetchData = () => {
  return {
    type: LOADING_START_ON_DATA_FETCH,
  };
};

export const loadingEndAfterDataFetch = () => {
  return {
    type: LOADING_END_AFTER_DATA_FETCH,
  };
};
