/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {
  NavigationContainer,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

const PRIMARY_COLOR = '#f4511e';
const TITLE_COLOR = '#fff';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

type RootParamList = {
  Home: undefined;
  Details: {
    detailId: string;
  };
};

function MainScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Home'>>();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details 123"
        onPress={() => {
          navigation.push('Details', {
            detailId: '123',
          });
        }}
      />
      <Button
        title="Go to Details 456"
        onPress={() => {
          navigation.push('Details', {
            detailId: '456',
          });
        }}
      />
    </View>
  );
}

function MessageScreen() {
  return (
    <View style={styles.container}>
      <Text>Feed Screen</Text>
    </View>
  );
}

function DetailsScreen() {
  const route = useRoute<RouteProp<RootParamList, 'Details'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Details'>>();
  const detailId = route.params.detailId;

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Text>Detail ID: {detailId}</Text>

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
      <Button title="Go back" onPress={() => navigation.goBack()} />

      <Button
        title="Go back to first screen in stack"
        onPress={() => navigation.popToTop()}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createMaterialTopTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
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
              <Tab.Screen name="Main" component={MainScreen} />
              <Tab.Screen name="Message" component={MessageScreen} />
            </Tab.Navigator>
          )}
        </Stack.Screen>
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{title: 'Overview'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
