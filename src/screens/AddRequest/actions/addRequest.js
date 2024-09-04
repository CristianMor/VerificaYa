import { db } from '../../../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default (request, navigation) => async (dispatch) => {
  dispatch({ type: "CHANGE_LOADER" });
  const { email } = JSON.parse(await AsyncStorage.getItem("@user_session"));
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1; // month is zero-based
  let dd = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  const formatted = yyyy + '-' + mm + '-' + dd;
  await addDoc(collection(db, "requests"), {...request, user_email: email, created_at: formatted });
  navigation.goBack();
};

