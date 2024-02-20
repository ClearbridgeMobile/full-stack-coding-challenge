const companyReducer = (state = { companiesList: [] }, action) => {
    switch (action.type) {
      case 'SET_COMPANIES':
        return { ...state, companiesList: action.payload };
      default:
        return state;
    }
  };
  
  export default companyReducer;
  