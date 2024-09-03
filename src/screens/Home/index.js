import React from 'react';
import { StyleSheet } from 'react-native';
import { COLORS } from '../../global';
import { Button, Layout } from '@ui-kitten/components';
import { Header } from "../../components/molecules";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {

  const navigation = useNavigation();

  return (
    <Layout style={styles.mainContainer} level={"4"}>
      <Button onPress={() => navigation.navigate("AddRequest")}>Agregar</Button>
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
