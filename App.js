import React from 'react';
import { Image, StyleSheet, TouchableOpacity, Pressable, View } from 'react-native';
import { COLORS, ICONS } from './src/global';
import { InputPassword } from './src/components/molecules';
import { 
  ApplicationProvider, 
  Input,
  Button, 
  Layout, 
  Text,
  Spinner
} from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

const LoadingIndicator = (props) => (
  <View style={[props.style, styles.indicator]}>
    <Spinner status={"primary"} size={"small"} />
  </View>
);

const LoginScreen = () => {

  const [data, setData] = React.useState({ username: "", password: "" });

  const changeUserName = nextValue => setData({...data, username: nextValue});
  const changePassword = nextValue => setData({...data, password: nextValue});

  const login = () => {
    alert("Hola");
  };

  const openAccountRecovery = () => {
  }

  const textButton = true ? "Cargando" : "Iniciar";
  const accessoryLeft = true ? () => <LoadingIndicator /> : null;

  return (
    <Layout style={styles.mainContainer} level={"4"} >
      <Image source={ICONS.LOGO} style={styles.logo} />
      <View style={styles.formContainer} >
        <Input
          value={data.username}
          label={"Usuario"}
          placeholder={"Ingresa tu Usuario"}
          onChangeText={changeUserName}
        />
        <InputPassword
          value={data.password}
          label={"Contraseña"}
          placeholder={"Ingresa tu Contraseña"}
          onChangeText={changePassword}
        />
        <Button
          appearance={"filled"}
          onPress={() => login()}
          accessoryLeft={accessoryLeft}
          size={"large"}
          status={"basic"}
        >
          <Text category={"h2"} status={"primary"}>{textButton}</Text>
        </Button>
      </View>
      <View style={styles.fooContainer}>
        <Pressable onPress={openAccountRecovery} style={styles.linkContainerAccountRecovery}>
          <Text category={"p2"} status={"info"}>{"Recuperar cuenta"}</Text> 
        </Pressable>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
          <Text category={"p2"} status={"basic"} >{"¿No tienes una cuenta? "}</Text>
          <Pressable>
            <Text category={"p2"} status={"info"}>{"Registrate aquí"}</Text>
          </Pressable>
        </View>
      </View>
    </Layout>
  );
};

export default function App() {

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <LoginScreen />
    </ApplicationProvider>
  );
}

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
    height: '35%',
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
