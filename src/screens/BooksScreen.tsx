import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  TouchableHighlight,
  StyleSheet,
  SectionListData,
} from 'react-native';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../App';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DocumentExploreMeta} from '../types';

const booksScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    fontSize: 16,
    paddingVertical: 4,
    paddingHorizontal: 16,
    backgroundColor: '#eee',
    color: '#999',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
  },
  itemTitle: {
    color: '#000',
    fontSize: 18,
  },
  itemDescText: {
    color: '#aaa',
    fontSize: 14,
  },
  empty: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#aaa',
  },
  footerText: {
    color: '#aaa',
  },
});

type SectionData = {
  title: string;
  data: Array<DocumentExploreMeta>;
};

export function BooksScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Home'>>();

  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const [recent, setRecent] = useState<Array<DocumentExploreMeta>>([]);

  useEffect(() => {
    try {
      AsyncStorage.getItem('recent-books').then(recentBooksJson => {
        if (recentBooksJson) {
          const data = JSON.parse(recentBooksJson);
          setRecent(data);
        }
      });
    } finally {
      setRefreshing(false);
    }
  }, [isFocused, refreshing]);

  const DATA = useMemo<
    SectionListData<DocumentExploreMeta, SectionData>[]
  >(() => {
    return [
      {
        title: 'Recent',
        data: recent.map(item => item),
      },
    ];
  }, [recent]);

  return (
    <SafeAreaView style={booksScreenStyles.container}>
      <SectionList<DocumentExploreMeta, SectionData>
        onRefresh={() => {
          setRefreshing(true);
        }}
        stickySectionHeadersEnabled
        refreshing={refreshing}
        sections={DATA}
        keyExtractor={(item, index) => item.md5 + index}
        renderItem={({item}) => (
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDD"
            onPress={() => {
              navigation.navigate('Details', {documentExploreMeta: item});
            }}>
            <View style={booksScreenStyles.item}>
              <Text style={booksScreenStyles.itemTitle}>
                {item.pickerResult.name}
              </Text>
              <View>
                <Text style={booksScreenStyles.itemDescText}>{item.md5}</Text>
                <Text style={booksScreenStyles.itemDescText}>
                  {item.updatedAt}
                </Text>
              </View>
            </View>
          </TouchableHighlight>
        )}
        renderSectionHeader={({section}) => (
          <Text style={booksScreenStyles.section}>{section.title}</Text>
        )}
        ListFooterComponent={DATA.length > 0 ? <ListFooter /> : <View />}
        ListEmptyComponent={DATA.length === 0 ? <ListEmpty /> : <View />}
      />
    </SafeAreaView>
  );
}

function ListFooter() {
  return (
    <View style={booksScreenStyles.footer}>
      <Text style={booksScreenStyles.footerText}>~ bottom ~</Text>
    </View>
  );
}

function ListEmpty() {
  return (
    <View style={booksScreenStyles.empty}>
      <Text>Empty</Text>
    </View>
  );
}
