import React from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
} from 'react-native';
import { List, Checkbox } from 'react-native-paper';

export default function FavoritesScreen(props) {
  const element = props.userinfo.map((league, index) => {
    const subelement = league.teams.map((team, index) => {
      return (
        <List.Item title={team.name} key={index}/>
      );
    })
    return (
      <List.Accordion
          title={league.title}
          left={props => <List.Icon {...props} icon="folder" />}
          key={index}
      >{subelement}
      </List.Accordion>
    );
  })

  return (
    <ScrollView>
      {element}
    </ScrollView>
  );
}
