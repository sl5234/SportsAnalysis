import { user_favorites_template } from '../screens/fav-data';
import _ from 'lodash'

const SAVE_USER_FAVORITES = 'SAVE_USER_FAVORITES'

function saveUserFavs(userFavorites) {
  return {
    type: SAVE_USER_FAVORITES,
    userFavorites
  }
}

export function initializeUserFavs(selectedFavs) {
  console.log("HEY", selectedFavs)
  // deep copy provided favorites template and update accordingly
  let userFavorites = _.cloneDeep(user_favorites_template)
  selectedFavs.map((selected_team) => {
    userFavorites.map((league) => {
      league.teams.map((team) => {
        if (team.name === selected_team) { team.selected = !team.selected }
      })
    })
  })

  // save user favorites data in redux state -> device storage (redux-persist)
  return (dispatch) => {
    dispatch(saveUserFavs(userFavorites))
  }
}
