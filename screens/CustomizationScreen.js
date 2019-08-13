import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { List, Checkbox } from 'react-native-paper';

export default function CustomizationScreen(props) {
  console.log(props)

  return (
    <List.Section title="Team Selection">
      <List.Accordion
        title="Uncontrolled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>

      <List.Accordion
        title="Controlled Accordion"
        left={props => <List.Icon {...props} icon="folder" />}
      >
        <List.Item title="First item" />
        <List.Item title="Second item" />
      </List.Accordion>
    </List.Section>
  );
}
