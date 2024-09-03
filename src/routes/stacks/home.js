import React from 'react';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../context';
import { logout } from '../../screens/Home/actions';

import HomeScreen from '../../screens/Home';


export default () => {

  const { authDispatch } = React.useContext(AuthContext);
  const Stack = createNativeStackNavigator();

  const theme = useTheme();
  const color = theme['color-primary-100'];
  const backgroundColor = theme['color-primary-500'];

  const headerRight = () => (
    <Button 
      status={"control"}
      appearance={"ghost"}
      size={"small"} 
      onPress={() => logout()(authDispatch)}
    >{"Cerrar sesión"}</Button>
  );

  return (
    <Stack.Navigator initialRouteName={"Home"} >
      <Stack.Screen 
        name={"Home"} 
        component={HomeScreen} 
        options={{ 
          title: "VerificaYa",
          headerTitleStyle: { color },
          headerStyle: { backgroundColor },
          headerRight
        }} 
      />
    </Stack.Navigator>
  );
};

