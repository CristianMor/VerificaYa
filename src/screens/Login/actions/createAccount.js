import { Alert } from 'react-native';
import { auth } from '../../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ email, password }, navigation) => (dispatch) => {
  let loading = { active: true, label: "Crear cuenta" };
  if(email.length < 1 || password.length < 1){
    Alert.alert("¡Ups! Parece que olvidaste algo.", "Por favor, asegúrate de ingresar tu correo electrónico y contraseña para continuar.");
  }else {
    dispatch({ type: "CHANGE_LOADER", payload: { start: 0, loading }});
    loading = {...loading, active: false };
    createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
      AsyncStorage.setItem("@user_session", "AUTHENTICATED");
      dispatch({ type: "AUTHENTICATED" });
    }).catch(error => {
      dispatch({ type: "CHANGE_LOADER", payload: { start: 0, loading }});
      Alert.alert(error.message);
    });
  }
}
