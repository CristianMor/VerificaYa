import React from 'react';
import { AuthContext } from '../../context';
import { logout } from '../../screens/Home/actions';
import { Button, Text, useTheme } from '@ui-kitten/components';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../../screens/Home';
import AddRequestScreen from '../../screens/AddRequest';

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
      <Stack.Screen 
        name={"AddRequest"}
        component={AddRequestScreen}
        options={{
          title: "Solicitud",
          presentation: "modal",
          headerStyle: { backgroundColor },
          headerTitleStyle: { color }
        }}
      />
    </Stack.Navigator>
  );
};

