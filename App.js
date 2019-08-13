import { AppLoading } from 'expo';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React, { useState } from 'react';
import { Platform, StatusBar, StyleSheet, View, Button } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import AppNavigator from './navigation/AppNavigator';

import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';
import S3Album from 'aws-amplify';
import awsconfig from './src/aws-exports';
import { withAuthenticator } from 'aws-amplify-react-native';
Amplify.configure(awsconfig);

const listTodos = `query listTodos {
  listTodos{
    items{
      id
      name
      description
    }
  }
}`

const addTodo = `mutation createTodo($name:String! $description: String!) {
  createTodo(input:{
    name:$name
    description:$description
  }){
    id
    name
    description
  }
}`

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { isLoadingComplete: false }
    this.handleFinishLoading = this.handleFinishLoading.bind(this)
  }

  async loadResourcesAsync() {
    await Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free to
        // remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  }

  handleLoadingError(error) {
    // In this case, you might want to report the error to your error reporting
    // service, for example Sentry
    console.warn(error);
  }

  handleFinishLoading() {
    this.setState({ isLoadingComplete: true })
  }

  todoMutation = async () => {
    const todoDetails = {
      name: 'Party tonight!',
      description: 'Amplify CLI rocks!'
    };

    const newTodo = await API.graphql(graphqlOperation(addTodo, todoDetails));
    alert(JSON.stringify(newTodo));
  }

  listQuery = async () => {
    console.log('listing todos');
    const allTodos = await API.graphql(graphqlOperation(listTodos));
    alert(JSON.stringify(allTodos));
  }

  render() {
    const { isLoadingComplete, setLoadingComplete } = this.state

    if (!isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    } else {
      return (
        <PaperProvider>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
            <Button onPress={this.listQuery} title="GraphQL Query" />
            <Button onPress={this.todoMutation} title="GraphQL Mutation" />
          </View>
        </PaperProvider>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default withAuthenticator(App, true);
