import React from 'react';
import { 
  ApplicationProvider, 
  Input,
  Button, 
  Layout, 
  Text,
  useTheme,
} from '@ui-kitten/components';
import { AuthContext } from '../../context';
import { COLORS, ICONS } from '../../global';
import { createAccount, login } from './actions';
import { useNavigation } from '@react-navigation/native';
import { InputPassword } from '../../components/molecules';
import { LoadingIndicator } from './../../components/atoms';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Alert, Image, StyleSheet, TouchableOpacity, Pressable, View } from 'react-native';

const LoginScreen = () => {
  
  const theme = useTheme();
  const navigation = useNavigation();

  const [data, setData] = React.useState({ email: "", password: "" });
  const { authState: { loading }, authDispatch } = React.useContext(AuthContext);

  const changeEmail = nextValue => setData({...data, email: nextValue});
  const changePassword = nextValue => setData({...data, password: nextValue});

  const accessoryLeftInit = loading[0].active ? () => <LoadingIndicator /> : null;
  const accessoryLeftCreate = loading[1].active ? () => <LoadingIndicator /> : null;

  const tintColor = theme['color-primary-500'];

  return (
    <Layout style={styles.mainContainer} level={"4"} >
      <Image source={ICONS.LOGO} style={[styles.logo, { tintColor }]} />
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
          onPress={() => login(data)(authDispatch)}
          accessoryLeft={accessoryLeftInit}
          size={"large"}
          status={"primary"}
          >
          <Text>{loading[0].label}</Text>
        </Button>
        <Button
          appearance={"filled"}
          onPress={() => createAccount(data)(authDispatch)}
          accessoryLeft={accessoryLeftCreate}
          size={"large"}
          status={"primary"}
        >
          <Text>{loading[1].label}</Text>
        </Button>
      </View>
      <View style={styles.fooContainer}>
        <Pressable onPress={() => navigation.navigate("Recovery")} style={styles.linkContainerAccountRecovery}>
          <Text category={"c2"} status={"info"}>{"Recuperar cuenta"}</Text> 
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
    height: '30%',
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
  linkContainerAccountRecovery: { 
    alignItems: 'center', 
    marginBottom: 5 
  }
});
