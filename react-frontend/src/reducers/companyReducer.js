const companyReducer = (state = { companiesList: [] }, action) => {
    switch (action.type) {
      case 'SET_COMPANIES':
        return { ...state, companiesList: action.payload };
      case 'ADD_COMPANY':
        return {
          ...state,
          companiesList: [...state.companiesList, action.payload],
        };
        case 'DELETE_COMPANY':
          const updatedCompaniesList = state.companiesList.filter(
            (company) => company.companyId != action.payload
          );
          return {
            ...state,
            companiesList: updatedCompaniesList,
          };
        case 'UPDATE_COMPANY':
          const newCompaniesList = state.companiesList.map((company) =>
            company.companyId == action.payload.companyId ? action.payload : company
          );
          return {
            ...state,
            companiesList: newCompaniesList,
          };
      default:
        return state;
    }
  };
  
  export default companyReducer;
  