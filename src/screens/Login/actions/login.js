import { Alert } from 'react-native';
import { auth } from '../../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import AsyncStorage from "@react-native-async-storage/async-storage";

export default ({ email, password }) => (dispatch) => {
  let loading = { active: true, label: "Iniciar" };
  if(email.length < 1 || password.length < 1){
    Alert.alert("¡Ups! Parece que olvidaste algo.", "Por favor, asegúrate de ingresar tu correo electrónico y contraseña para continuar.");
  }else {
    dispatch({ type: "CHANGE_LOADER", payload: { start: 1, loading }});
    loading = {...loading, active: false };
   signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      AsyncStorage.setItem("@user_session", "AUTHENTICATED");
      dispatch({ type: "AUTHENTICATED", payload: { start: 1, loading }});
    }).catch(error => {
      Alert.alert("Ah ocurrido un error");
      dispatch({ type: "CHANGE_LOADER", payload: { start: 1, loading }});
    });
  }
}
