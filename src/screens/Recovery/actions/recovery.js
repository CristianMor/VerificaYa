import { Alert } from 'react-native';
import { auth } from '../../../config/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

export default (email, navigation) => (dispatch) =>  {

  if(email.length < 1){
    return Alert.alert("¡Ups! Parece que olvidaste algo.", "Por favor, asegúrate de ingresar tu correo electrónico para continuar.")
  }

  dispatch({ type: "CHANGE_LOADER" });

  sendPasswordResetEmail(auth, email).then(() => {
    dispatch({ type: "CHANGE_LOADER" });
    Alert.alert(
      '¡Correo enviado!',
      'Revisa tu bandeja de entrada para continuar con el restablecimiento.',
      [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]
    );
  }).catch(error => {
    dispatch({ type: "CHANGE_LOADER" });
    Alert.alert(error.message);
  });
}
