

export const getMenu = () => (dispatch) => {
  try {
    dispatch({type: "GET_MENU"})
  } catch (err) {
    console.error(err)
  }
}

export const updateMenu = (status) => (dispatch) => {
  try {
    dispatch({type: "UPDATE_MENU", payload: status})
  } catch (err) {
    console.error(err)
  }
}