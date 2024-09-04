import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { COLORS } from '../../global';
import { Button, Divider, Layout, Text, Toggle } from '@ui-kitten/components';
import { CardRequest } from "../../components/molecules";
import { useNavigation } from '@react-navigation/native';
import { verifyRequest } from './actions';
import { db } from '../../config/firebase';
import { collection, query, orderBy, querySnapshot, onSnapshot } from 'firebase/firestore';

import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {

  const navigation = useNavigation();
  const [activeChecked, setActiveChecked] = React.useState(false);

  const [state, dispatch] = React.useReducer(reducers, initialStates);
  const { pendingRequests, verifyRequests } = state;

  const showRequests = !activeChecked ? "Pendientes" : "Verificadas";
  const data = !activeChecked ? pendingRequests : verifyRequests;

  React.useEffect(() => {
    
    async function initial(){
      const { email } = JSON.parse(await AsyncStorage.getItem("@user_session"));
      const collectionRef = collection(db, 'requests');
      const q = query(collectionRef, orderBy('createdAt', 'desc'));

      const unsuscribe = onSnapshot(q, querySnapshot => {
        const requests = querySnapshot.docs.map(doc => ({...doc.data(), id: doc.id})).filter(request => request.userEmail.toLowerCase() !== email.toLowerCase());
        const pendingRequests = requests.filter(request => request.status === "pending");
        const verifyRequests = requests.filter(request => request.status !== "pending");
        dispatch({ type: "DATA_OK", payload: { pendingRequests, verifyRequests }});
      });

      return unsuscribe;
    };

    initial();

  }, []);

  return (
    <Layout style={styles.mainContainer} level={"4"}>
      <Text style={{width: '100%', marginBottom: 20}} category={"h1"}>{"Solicitudes"}</Text>
      <View style={styles.rowContainer}>
        <Toggle
          style={styles.toggle}
          checked={activeChecked}
          onChange={(isChecked) => setActiveChecked(isChecked)}
        >
          {showRequests}
        </Toggle>
        <Button size={"small"} onPress={() => navigation.navigate("AddRequest")}>{"Nueva"}</Button>
      </View>
      <FlatList 
        data={data}
        renderItem={({item}) => <CardRequest {...item} />}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => <Divider />}
        ListEmptyComponent={() => <Text appearance={"hint"} category={"c1"}>{"No hay solicitudes en la lista"}</Text>}
        showsVerticalScrollIndicator={false}
        style={{ width: '100%'}}
      />
    </Layout>
  );
};

const initialStates = {
  loading: false,
  pendingRequests: [],
  verifyRequests: []
}

const reducers = (state, { type, payload }) => {
  switch(type){
    case "DATA_OK":

      const { pendingRequests, verifyRequests } = payload;

      return {
        ...state,
        pendingRequests,
        verifyRequests
      }
  }
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1, 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    padding: 20
  }, 
  toggle: {
    margin: 2,
  },
  rowContainer: {
    flexDirection: 'row',
    width: "100%",
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  }
});
