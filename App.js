import React from 'react';
import { AuthProvider } from './src/context';
import { ApplicationProvider, Button, Text } from '@ui-kitten/components';
import { THEME } from './src/global';

import AppRouter from './src/routes';

import * as eva from '@eva-design/eva';

export default function App() {

  return (
    <AuthProvider>
      <ApplicationProvider {...eva} theme={{ ...eva.dark, ...THEME}}>
        <AppRouter />
      </ApplicationProvider>
    </AuthProvider>
  );

}
