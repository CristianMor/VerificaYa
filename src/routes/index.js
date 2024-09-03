import React from 'react';
import { StyleSheet } from 'react-native';
import { Layout, Spinner, Text } from "@ui-kitten/components";
import { NavigationContainer } from "@react-navigation/native";
import { HomeStack as App, AuthStack as Auth } from './stacks';

import { AuthContext } from '../context';

const Validating = () => (
  <Layout style={styles.rootContainer} level={"1"} >
    <Spinner status={"primary"} size={"large"}/>
    <Text style={{marginTop: 10}} status={"primary"} category={"p2"}>{"Validando sesión..."}</Text>
  </Layout>
);

export default () => {

  const { authState: { isLoggedIn, validating } } = React.useContext(AuthContext);

  if(!validating){
    return (
      <NavigationContainer>
        { isLoggedIn ? <App /> : <Auth /> }
      </NavigationContainer>
    );
  }

  return <Validating />;
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
  }
});
