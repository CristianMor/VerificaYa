import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS, ICONS } from './src/global';
import { InputAccessoriesShowcase } from './src/components/molecules';
import { ApplicationProvider, Layout, Text as KittenText} from '@ui-kitten/components';

import * as eva from '@eva-design/eva';

const LoginScreen = () => (
  <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 25}}>
    <KittenText category={'h1'}>{"INICIO DE SESIÓN"}</KittenText>
    <Image source={ICONS.LOGO} style={styles.logo} />
    <InputAccessoriesShowcase 
      label={"Usuario"}
      placeholder={"Ingresa tu Usuario"}
    />
    <InputAccessoriesShowcase 
      label={"Contraseña"}
      placeholder={"Ingresa tu Contraseña"}
    />
    <View style={{ width: '100%'}}>
      <Text style={{ width: '100%', textAlign: 'right' }}>Recuperar cuenta</Text>
      <Text style={{ width: '100%', textAlign: 'right' }}>¿No tienes una cuenta? Registrate aquí</Text>
    </View>
    <TouchableOpacity 
      onPress={() => console.log("Vamos a iniciar session") }
      style={styles.button_step_out}
    >
      <Image source={ICONS.STEP_OUT} style={styles.img_step_out}/>
    </TouchableOpacity>
  </Layout>
);

export default function App() {

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      {/*}<View style={styles.container}>
        <StatusBar style="auto" />
      </View>*/}
      <LoginScreen />
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button_step_out: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    backgroundColor: COLORS.BLACK,
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  img_step_out: { 
    width: 22, 
    height: 22,
    tintColor: COLORS.WHITE
  },
  logo: {
    resizeMode: 'containt',
    width: '80%',
  }
});
