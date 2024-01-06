import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const booksScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export function BooksScreen() {
  return (
    <View style={booksScreenStyles.container}>
      <Text>hello</Text>
    </View>
  );
}
