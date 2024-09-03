import AsyncStorage from "@react-native-async-storage/async-storage";

export default () => (dispatch) => {
  AsyncStorage.clear();
  dispatch({ type: "NOT_AUTHENTICATED"})
}
