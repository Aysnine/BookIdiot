import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../App';

const detailsScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function DetailsScreen() {
  const route = useRoute<RouteProp<RootParamList, 'Details'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Details'>>();
  const detailId = route.params.detailId;

  return (
    <View style={detailsScreenStyles.container}>
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
