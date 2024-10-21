import React, {useEffect, useState} from 'react';
import {FlatList, Platform, View} from 'react-native';
import {Header} from '../components/Header/Header';
import {FinancialEdgerHistory} from '../data/FinancialEdgerHistory';
import {AccountHistoryListItemView} from '../components/AccountHistoryListItemView';
import {useRootNavigation} from '../navigations/RootNavigation';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Icon} from '../components/Icons';
import {Button} from '../components/Button';

import SQLite from 'react-native-sqlite-storage';

const now = new Date().getTime();

export const MainScreen: React.FC = () => {
  const navigation = useRootNavigation();
  const safeAreaInset = useSafeAreaInsets();

  useEffect(() => {
    SQLite.openDatabase(
      {
        name: 'account_history.db',
        createFromLocation: '~www/account_history.db',
        location: 'default',
      },
      () => {
        console.log('DataBase Succeess');
      },
      () => {
        console.log('DataBase Failed');
      },
    );
  }, []);

  const [list] = useState<FinancialEdgerHistory[]>([
    {
      id: 0,
      type: '사용',
      price: 10000,
      comment: 'TEST_01',

      createdAt: now,
      updatedAt: now,
      photoUrl: null,
    },
    {
      id: 1,
      type: '수입',
      price: 10000,
      comment: 'TEST_02',

      createdAt: now,
      updatedAt: now,
      photoUrl:
        'https://images.unsplash.com/photo-1729180253305-23990aee8705?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0fHx8ZW58MHx8fHx8',
    },
  ]);
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="Main SCREEN" />
        {/* <Header.Icon iconName="close" onPress={() => {}} /> */}
      </Header>

      <FlatList
        data={list}
        renderItem={({item}) => {
          return (
            <AccountHistoryListItemView
              item={item}
              onPressItem={clickedItem => {
                console.log('item ::', item);
                navigation.push('Detail', {item: clickedItem});
              }}
            />
          );
        }}
      />

      <View
        style={{
          position: 'absolute',
          right: 12,
          bottom: 12 + safeAreaInset.bottom,
        }}>
        <Button onPress={() => navigation.push('Add')}>
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon name="add" size={30} color="white" />
          </View>
        </Button>
      </View>
    </View>
  );
};
