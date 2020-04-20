import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View , ScrollView} from 'react-native';
import SearchScreen from './components/SearchScreen';
import HomeScreen from './components/HomeScreen';
import { createAppContainer, createBottomTabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TextInput, Card, List } from 'react-native-paper';

const TabNavigator = createBottomTabNavigator({
  "current city": HomeScreen,
  "select city": SearchScreen,
},
{
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'current city') {
          iconName = 'md-cloud';
          
        } else if (routeName === 'select city') {
          iconName = 'md-options';
        }

        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'white',
      inactiveTintColor: 'gray',
      activeBackgroundColor: '#6200ee',
      inactiveBackgroundColor: '#6200ee',
    },
  },


);


const AppContainer = createAppContainer(TabNavigator);

export default class App extends Component<{}> {
  render() {
   return <AppContainer />;
  }
}


