
const reportReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_REPORT":
      return {report: action.payload};

    case "GET_REPORTS":
      return {reports: action.payload};

    default: 
      return state
  }
}

export default reportReducer