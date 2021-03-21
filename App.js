import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './src/components/Home';
import Detail from './src/components/Detail';

const HomeStack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <HomeStack.Navigator headerMode="none" initialRouteName="Home">
        <HomeStack.Screen name="Home" component={Home} />
        <HomeStack.Screen name="Detail" component={Detail} />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
  },
  image: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  box: {
    width: 100,
    height: 100,
    backgroundColor: 'red',
  },
});

export default App;
