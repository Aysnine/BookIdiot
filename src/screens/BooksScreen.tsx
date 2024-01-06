import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootParamList} from '../App';

export const DATA = [
  // {
  //   title: 'Internal file test',
  //   data: ['internal'],
  // },
  // {
  //   title: 'Online file test',
  //   data: [
  //     'http://xxx',
  //     'http://xxx',
  //     'http://xxx',
  //     'http://xxx',
  //     'http://xxx',
  //     'http://xxx',
  //   ],
  // },
  {
    title: 'Recent',
    // data: ['Water', 'Coke', 'Beer'],
    data: [] as string[],
  },
];

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

export function BooksScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Home'>>();

  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={booksScreenStyles.container}>
      <SectionList
        onRefresh={() => {
          setRefreshing(true);
          setTimeout(() => {
            setRefreshing(false);
          }, 1000);
        }}
        stickySectionHeadersEnabled
        refreshing={refreshing}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDD"
            onPress={() => {
              navigation.navigate('Details', {detailId: item});
            }}>
            <View style={booksScreenStyles.item}>
              <Text style={booksScreenStyles.itemTitle}>{item}</Text>
            </View>
          </TouchableHighlight>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={booksScreenStyles.section}>{title}</Text>
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
