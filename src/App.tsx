/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {MainScreen} from './screens/MainScreen';
import {BooksScreen} from './screens/BooksScreen';
import {ReaderScreen} from './screens/ReaderScreen';
import {DocumentExploreMeta} from './types';

const PRIMARY_COLOR = '#4dabf7';
const TITLE_COLOR = '#fff';

export type RootParamList = {
  Home: undefined;
  Details: {
    documentExploreMeta: DocumentExploreMeta;
  };
};

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          title: 'BookIdiot',
          animation: 'slide_from_right',
          headerStyle: {
            backgroundColor: PRIMARY_COLOR,
          },
          headerTintColor: TITLE_COLOR,
          statusBarColor: PRIMARY_COLOR,
        }}>
        <Stack.Screen name="Home">
          {() => (
            <Tab.Navigator
              initialRouteName="Main"
              screenOptions={{
                tabBarActiveTintColor: PRIMARY_COLOR,
                tabBarIndicatorStyle: {
                  backgroundColor: PRIMARY_COLOR,
                },
              }}>
              <Tab.Screen
                name="Main"
                component={MainScreen}
                options={{
                  title: 'Home',
                }}
              />
              <Tab.Screen
                name="Books"
                component={BooksScreen}
                options={{
                  title: 'Books',
                }}
              />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={ReaderScreen}
          options={{title: 'Reader'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
