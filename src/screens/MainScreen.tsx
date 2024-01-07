import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';
import DocumentPicker, {
  isCancel,
  isInProgress,
} from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {stringMd5} from 'react-native-quick-md5';
import {DocumentExploreMeta} from '../types';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../App';
import {useNavigation} from '@react-navigation/native';

const mainScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});

export function MainScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Home'>>();

  const [result, setResult] = useState<Array<DocumentExploreMeta>>([]);

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      // console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const [recentBooks, setRecentBooks] = useState<Array<DocumentExploreMeta>>(
    [],
  );

  useEffect(() => {
    const loadRecentBooks = async () => {
      const recentBooksJson = await AsyncStorage.getItem('recent-books');
      if (recentBooksJson) {
        const data = JSON.parse(recentBooksJson);
        setRecentBooks(data);
      }
    };
    loadRecentBooks();
  }, []);

  return (
    <SafeAreaView style={mainScreenStyles.container}>
      <View style={mainScreenStyles.container}>
        <Button
          title="Open Epub File"
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                presentationStyle: 'fullScreen',
                copyTo: 'cachesDirectory',
              });

              if (pickerResult.type !== 'application/epub+zip') {
                Alert.alert('Not a epub file');
                return;
              }

              const md5 = stringMd5(pickerResult.uri);

              const currentOpened: DocumentExploreMeta = {
                pickerResult,
                updatedAt: new Date().toISOString(),
                md5,
              };
              setResult([currentOpened]);

              const existingBook = recentBooks.find(book => book.md5 === md5);

              const books = (
                existingBook
                  ? [
                      currentOpened,
                      ...recentBooks.filter(book => book.md5 !== md5),
                    ]
                  : [currentOpened, ...recentBooks]
              )
                .sort(
                  (a, b) =>
                    new Date(b.updatedAt).getTime() -
                    new Date(a.updatedAt).getTime(),
                )
                .slice(0, 10);

              setRecentBooks(books);

              try {
                await AsyncStorage.setItem(
                  'recent-books',
                  JSON.stringify(books, null, 2),
                );
              } catch (e) {
                console.log('save to recent error', e);
              }

              navigation.navigate('Details', {
                documentExploreMeta: currentOpened,
              });
            } catch (e) {
              handleError(e);
            }
          }}
        />

        <Text selectable>
          Debug Current Open: {JSON.stringify(result, null, 2)}
        </Text>
      </View>
    </SafeAreaView>
  );
}
