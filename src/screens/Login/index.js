import React from 'react';
import { Alert, Image, StyleSheet, TouchableOpacity, Pressable, View } from 'react-native';
import { COLORS, ICONS } from '../../global';
import { InputPassword } from '../../components/molecules';
import { 
  ApplicationProvider, 
  Input,
  Button, 
  Layout, 
  Text,
  Spinner
} from '@ui-kitten/components';

import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../config/firebase';

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner status={"primary"} size={"small"} />
  </View>
);

const LoginScreen = () => {

  const [loading, setLoading] = React.useState([{ active: false, label: "Iniciar"}, { active : false, label: 'Crear cuenta'}]);
  const [data, setData] = React.useState({ email: "", password: "" });

  const navigation = useNavigation();

  const changeEmail = nextValue => setData({...data, email: nextValue});
  const changePassword = nextValue => setData({...data, password: nextValue});

  const handleLogin = () => {
    const { email, password } = data;
    if(email.length < 1 || password.length < 1){
      Alert.alert("¡Ups! Parece que olvidaste algo.", "Por favor, asegúrate de ingresar tu correo electrónico y contraseña para continuar.");
    }else {
      signInWithEmailAndPassword(auth, email, password).then(userCredential => {
        const user = userCredential.user;
        navigation.navigate("Home");
      }).catch(error => {
          Alert.alert(error.message);
      });
    }
  };

  const handleCreateAccount = () => {
    const { email, password } = data;
    if(email.length < 1 || password.length < 1){
      Alert.alert("¡Ups! Parece que olvidaste algo.", "Por favor, asegúrate de ingresar tu correo electrónico y contraseña para continuar.");
    }else {
      createUserWithEmailAndPassword(auth, email, password).then(userCredential => {
        const user = userCredential.user;
        navigation.navigate("Home");
      }).catch(error => {
          Alert.alert(error.message);
      });
    }
  };

  const openAccountRecovery = () => {
    alert("Vamos a recuperar la cuenta vijito");
  };

  const accessoryLeftInit = loading[0].active ? () => <LoadingIndicator /> : null;
  const accessoryLeftCreate = loading[1].active ? () => <LoadingIndicator /> : null;

  return (
    <Layout style={styles.mainContainer} level={"4"} >
      <Image source={ICONS.LOGO} style={styles.logo} />
      <View style={styles.formContainer} >
        <Input
          value={data.email}
          label={"Correo electrónico"}
          placeholder={"Ingresa tu Correo electrónico"}
          onChangeText={changeEmail}
        />
        <InputPassword
          value={data.password}
          label={"Contraseña"}
          placeholder={"Ingresa tu Contraseña"}
          onChangeText={changePassword}
        />
        <Button
          appearance={"filled"}
          onPress={handleLogin}
          accessoryLeft={accessoryLeftInit}
          size={"large"}
          status={"basic"}
        >
          <Text category={"h6"} status={"primary"}>{loading[0].label}</Text>
        </Button>
        <Button
          appearance={"filled"}
          onPress={handleCreateAccount}
          accessoryLeft={accessoryLeftCreate}
          size={"large"}
          status={"basic"}
        >
          <Text category={"h6"} status={"primary"}>{loading[1].label}</Text>
        </Button>
      </View>
      <View style={styles.fooContainer}>
        <Pressable onPress={openAccountRecovery} style={styles.linkContainerAccountRecovery}>
          <Text category={"p2"} status={"info"}>{"Recuperar cuenta"}</Text> 
        </Pressable>
      </View>
    </Layout>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingHorizontal: 25
  },
  formContainer: {
    justifyContent: 'space-around',
    width: '100%', 
    height: '45%',
    paddingHorizontal: 10,
  },
  fooContainer: { 
    width: '100%', 
    marginTop: '15%'
  },
  logo: {
    resizeMode: 'containt',
    width: '80%',
    marginBottom: 10,
  },
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  linkContainerAccountRecovery: { 
    alignItems: 'center', 
    marginBottom: 5 
  }
});
