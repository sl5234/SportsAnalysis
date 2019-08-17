import React from 'react';
import {
  StyleSheet,
  Button,
  ScrollView,
} from 'react-native';
import { List } from 'react-native-paper';

import { connect } from 'react-redux'

import CustomCheckbox from '../components/CustomCheckbox';
import { initializeUserFavs } from '../actions/index';
import { user_favorites_template } from '../screens/fav-data';

class FavoritesScreen extends React.Component {
  constructor(props) {
    super(props)
    this._handleFinish = this._handleFinish.bind(this)
  }

  _handleSelect(team) {
    TEAMS = [...TEAMS, team]
  }

  _handleFinish() {
    // save user favorites data in redux state -> device storage (redux-persist)
    this.props.dispatchInitializeUserFavs(TEAMS)
  }

  render() {
    const leagues = user_favorites_template.map(league => {
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

const mapDispatchToProps = {
  dispatchInitializeUserFavs: (selectedFavs) => initializeUserFavs(selectedFavs),
}

export default connect(null, mapDispatchToProps)(FavoritesScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
