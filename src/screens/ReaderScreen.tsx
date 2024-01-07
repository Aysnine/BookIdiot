import React, {useEffect, useRef} from 'react';
import {StyleSheet, View} from 'react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../App';
import WebView from 'react-native-webview';

const readerScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue',
  },
  wholeScreen: {flex: 1, backgroundColor: '#fff'},
});

export function ReaderScreen() {
  const route = useRoute<RouteProp<RootParamList, 'Details'>>();
  const bookName = route.params.documentExploreMeta.pickerResult.name;
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Details'>>();

  const webview = useRef<WebView>(null);

  useEffect(() => {
    if (bookName) {
      navigation.setOptions({
        title: bookName,
      });
    }
  }, [bookName, navigation]);

  return (
    <View style={readerScreenStyles.container}>
      <WebView
        ref={webview}
        style={[readerScreenStyles.wholeScreen]}
        originWhitelist={['*']}
        source={{html: '<h1>This is a static HTML source!</h1>'}}
      />
    </View>
  );
}
