import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

const AddRequestScreen = () => {

  const [request, setRequest] = React.useState({ title: '', description: '' });
  const disabled = request.title < 1;

  const changeTitleText = (value) => setRequest({...request, title: value });
  const changeDescriptionText = (value) => setRequest({...request, description: value });

  return(
    <Layout style={styles.rootContainer} level={"4"} >
      <Text style={{ marginBottom: 20 }} category={"h1"} status={"basic"} >{"Registro de solicitud"}</Text>  
        <Input
          value={request.title}
          placeholder={"Título"}
          style={{ marginBottom: 10 }}
          onChangeText={changeTitleText}
        />
        <Input
          value={request.description}
          multiline={true}
          placeholder={"Descripción (opcional) "}
          textStyle={{ minHeight: 164}}
          style={{ marginBottom: 10, maxHeight: '70%' }}
          onChangeText={changeDescriptionText}
        />
      <Button
        disabled={disabled}
      >{"Agregar Solicitud"}</Button>
    </Layout>
  );
};

export default AddRequestScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 20,
  }
});
