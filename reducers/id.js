const initialState = {
  userFavorites: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SAVE_USER_FAVORITES':
      return {
        ...state,
        userFavorites: action.userFavorites
      }
    default:
      return state
  }
}
