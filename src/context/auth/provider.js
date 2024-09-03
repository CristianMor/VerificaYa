import React from 'react';
import AuthContext from './index';
import reducers from './reducers';
import initialStates from './initialStates';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthProvider = ({ children }) => {

  const [authState, authDispatch] = React.useReducer(reducers, initialStates);

  const validateSession = React.useCallback(async () => {
    try {
      const userSession = await AsyncStorage.getItem("@user_session");
      if(userSession) return authDispatch({ type: "AUTHENTICATED" }); 
      return authDispatch({ type: "NOT_AUTHENTICATED" });
    } catch(e) {
      alert("Problemas al obtener los datos del storage");
      authDispatch({ type: "NOT_AUTHENTICATED" });
    }
  }, []);

  React.useEffect(() => {
    validateSession();
  },[]);

  return (
    <AuthContext.Provider value={{ authState, authDispatch}} >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
