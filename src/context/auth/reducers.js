export default (state, { type, payload }) => {
  switch(type){
    case "CHANGE_LOADER":
      const loading = payload.start === 1 ? [payload.loading, state.loading[1]] : [state.loading[0], payload.loading];
      return {
        ...state,
        loading
      }

    case "NOT_AUTHENTICATED":
      return {
        ...state,
        validating: false,
        isLoggedIn: false,
      };

    case "AUTHENTICATED":
      return {
        ...state,
        validating: false,
        isLoggedIn: true,
        loading: [
          { active: false, label: "Iniciar"}, 
          { active : false, label: 'Crear cuenta'}
        ]
      };

    default:
      return state;
  }
}
