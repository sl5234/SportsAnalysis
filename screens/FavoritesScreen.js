import React from 'react';
import {
  StyleSheet,
  Button,
  ScrollView,
  AsyncStorage,
} from 'react-native';
import { List } from 'react-native-paper';

import _ from 'lodash'

import CustomCheckbox from '../components/CustomCheckbox';

export default class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props)
    this._handleFinish = this._handleFinish.bind(this)
  }

  _handleSelect(team) {
    TEAMS = [...TEAMS, team]
  }

  async _handleFinish() {
    // deep copy provided favorites template and update accordingly
    let favs_template = _.cloneDeep(this.props.userinfo)
    TEAMS.map((selected_team) => {
      favs_template.map((league) => {
        league.teams.map((team) => {
          if (team.name === selected_team) { team.selected = !team.selected }
        })
      })
    })
    // save user favorites data in device storage
    await AsyncStorage.setItem('userFavorites', JSON.stringify(favs_template))
    
    // invoke callback to HomeScreen prompting screen transition
    this.props.onFinish(favs_template)
  }

  render() {
    const leagues = this.props.userinfo.map(league => {
      const teams = league.teams.map(team => {
        return (
          <CustomCheckbox
            name={team.name}
            key={team.name}
            onSelect={this._handleSelect}
          />
        );
      })

      return (
        <List.Accordion
          title={league.title}
          left={props => <List.Icon {...props} icon="star" />}
          key={league.title}
        >{teams}
        </List.Accordion>
      );
    })

    return (
      <ScrollView style={{styles}}>
        {leagues}
        <Button title="Done" onPress={this._handleFinish}/>
      </ScrollView>
    );
  }
}

let TEAMS = []

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
