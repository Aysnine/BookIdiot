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
import {RootParamList, DATA} from '../App';

const mainScreenStyles = StyleSheet.create({
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

export function MainScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootParamList, 'Home'>>();

  const [refreshing, setRefreshing] = useState(false);

  return (
    <SafeAreaView style={mainScreenStyles.container}>
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
            <View style={mainScreenStyles.item}>
              <Text style={mainScreenStyles.itemTitle}>{item}</Text>
            </View>
          </TouchableHighlight>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={mainScreenStyles.section}>{title}</Text>
        )}
        ListFooterComponent={DATA.length > 0 ? <ListFooter /> : <View />}
        ListEmptyComponent={DATA.length === 0 ? <ListEmpty /> : <View />}
      />
    </SafeAreaView>
  );
}

function ListFooter() {
  return (
    <View style={mainScreenStyles.footer}>
      <Text style={mainScreenStyles.footerText}>~ bottom ~</Text>
    </View>
  );
}

function ListEmpty() {
  return (
    <View style={mainScreenStyles.empty}>
      <Text>Empty</Text>
    </View>
  );
}
