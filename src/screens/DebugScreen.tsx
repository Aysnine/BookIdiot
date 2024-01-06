import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const debugScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function DebugScreen() {
  return (
    <View style={debugScreenStyles.container}>
      <Text>hello</Text>
    </View>
  );
}
