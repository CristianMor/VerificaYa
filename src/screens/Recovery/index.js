import React from 'react';
import { recovery } from './actions';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LoadingIndicator } from './../../components/atoms';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import initialStates from './initialStates';
import reducers from './reducers';

const RecoveryScreen = () => {

  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [state, dispatch] = React.useReducer(reducers, initialStates);
  const { loading } = state;

  const changeEmail = (value) => setEmail(value);
  const accessoryLeft = loading ? () => <LoadingIndicator /> : null;
  
  return(
    <Layout style={styles.mainContainer} level={"4"} >
      <View style={styles.formContainer}>
        <View>
          <Text category={"h1"} status={"basic"}>{"He olvidado mi contraseña."}</Text>
          <Text category={"s1"} status={"basic"}>{"Para restablecer la contraseña, introduce tu correo electronico."}</Text>
        </View>
        <Input
          value={email}
          label={"Correo electrónico"}
          placeholder={"Ingresa tu Correo electrónico"}
          onChangeText={changeEmail}
        />
        <Button
          appearance={"filled"}
          onPress={() => recovery(email, navigation)(dispatch)}
          accessoryLeft={accessoryLeft}
          size={"large"}
          status={"primary"}
        >
          <Text category={"h6"} status={"primary"}>{"Recuperar"}</Text>
        </Button>
      </View>
    </Layout>
  );

};

export default RecoveryScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingHorizontal: 25
  },
  formContainer: { 
    height: '40%',
    width: "100%", 
    paddingTop: 20,
    justifyContent: 'space-around',
  }
});
