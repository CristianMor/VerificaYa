import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../../screens/Login';
import RecoveryScreen from '../../screens/Recovery';

export default () => {

  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator initialRouteName={"Login"}>
      <Stack.Screen 
        name={"Login"} 
        component={LoginScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name={"Recovery"} 
        component={RecoveryScreen} 
        options={{ 
          title: "Recuperar cuenta",
          presentation: "modal" 
        }}
      />
    </Stack.Navigator>
  );
}
