export default (state, { type, payload }) => {

  switch(type){
    case "CHANGE_LOADER":
      return {
        ...state,
        loading: !state.loading 
      }
  }

}
