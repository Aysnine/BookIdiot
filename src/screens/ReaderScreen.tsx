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
  const bookUri = route.params.documentExploreMeta.pickerResult.uri;
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
        webviewDebuggingEnabled
        javaScriptEnabled
        domStorageEnabled
        ref={webview}
        style={[readerScreenStyles.wholeScreen]}
        originWhitelist={['*']}
        source={{
          html: `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
		<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/epubjs/dist/epub.min.js"></script>
		<style>
			body { margin: 0; }
			#reader {
				height: 100vh;
				width: 100vw;
				overflow: hidden !important;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		</style>
	</head>
	<body>
		<div id="reader"></div>
	</body>
	<script>
		window.book = ePub('${bookUri}');
		window.rendition = window.book.renderTo(document.getElementById('reader'), {
			width: '100%',
			height: '100%'
		});
    console.log('book');
	</script>
</html>
        `,
        }}
      />
    </View>
  );
}
