import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../global';
import { Layout } from '@ui-kitten/components';
import { Header } from "../../components/molecules";

const HomeScreen = () => {
  return (
    <Layout style={styles.mainContainer} level={"4"}>
      {/*}<Header />*/}
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    paddingHorizontal: 25
  }
});
