import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
Paragraph,
Checkbox,
Colors,
TouchableRipple,
withTheme,
Theme,
} from 'react-native-paper';

class CustomCheckbox extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { checked: false }
    this.onPress = this.onPress.bind(this)
  }

  onPress(team_name) {
    this.setState(state => ({checked: !state.checked}));
    this.props.onSelect(team_name)
  }

  render() {
    const {
      theme: {
        colors: { background },
      },
      name,
    } = this.props;

    return (
      <View style={[styles.container, { backgroundColor: background }]}>
        <TouchableRipple
          onPress={() => this.onPress(name)}
        >
          <View style={styles.row}>
            <Paragraph>{name}</Paragraph>
            <View pointerEvents="none">
              <Checkbox
                color={Colors.blue500}
                status={this.state.checked ? 'checked' : 'unchecked'}
              />
            </View>
          </View>
        </TouchableRipple>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
});

export default withTheme(CustomCheckbox);
