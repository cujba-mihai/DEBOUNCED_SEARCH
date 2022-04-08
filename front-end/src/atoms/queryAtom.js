import { atom } from "recoil";

const searchParam = window.location.search.replace("?data_name=", "");

export const queryState = atom({
  key: "queryState",
  default: searchParam || ''
})