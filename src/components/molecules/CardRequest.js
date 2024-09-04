import React from 'react';
import { ICONS } from "../../global";
import { Image, StyleSheet, View } from 'react-native';
import { Button, Text, useTheme } from "@ui-kitten/components";
import { LoadingIndicator } from '../atoms';
import { db } from '../../config/firebase';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';

const CardRequest = ({ id, title, description, createdAt, status }) => {

  const theme = useTheme();

  const [loading, setLoading] = React.useState(false);
  const statusIcon = status === 'pending' ? ICONS.PENDING : ICONS.VERIFY;
  const tintColor = status === 'pending' ? theme['color-basic-700'] : theme['color-success-500'];

  const backgroundColor = theme['background-basic-color-3'];
  const borderColor = theme['border-basic-color-3'];

  const titleButton = status === 'pending' ? 'Verificar' : "Eliminar";

  const verify = () => {
    setLoading(true);
    const docRef = doc(db, 'requests', id);
    updateDoc(docRef, { status: "verify" });
    setLoading(false);
  };

  const deleteRequest = () => {
    setLoading(true);
    const docRef = doc(db, 'requests', id);
    deleteDoc(docRef);
    setLoading(false);
  };


  return (
    <View style={[styles.rootContainer, { backgroundColor, borderColor }]} >
      <View style={styles.rowContainer}>
        <Image style={[styles.status, { tintColor }]} source={statusIcon} />
        <Text category={"h3"} >{title}</Text>
      </View>
      <Text style={{ marginTop: 5}}category={"p1"}>{description}</Text>
      <Text style={{ marginTop: 5}} appearance={"hint"}>{createdAt}</Text>
      <Button 
        onPress={status === 'pending' ? verify : deleteRequest}
        style={{ marginTop: 10, borderRadius: 8 }} 
        size={"large"} 
      >{loading ? <LoadingIndicator /> : titleButton }</Button>
    </View>
  );
}

export default CardRequest;

const styles = StyleSheet.create({
  rootContainer: {
    padding:10,
    borderRadius: 18,
    width: '100%',
    borderWidth: 1,
    marginVertical: 5
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  status: {
    width: 20, 
    height: 20,
    marginRight: 5,
  }
});
