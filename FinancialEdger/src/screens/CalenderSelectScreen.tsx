import React from 'react';
import {View} from 'react-native';
import {Header} from '../components/Header/Header';
import {useRootNavigation, useRootRoute} from '../navigations/RootNavigation';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {convertToDateString} from '../utils/DateUtils';

const today = new Date();
today.setHours(0);
today.setMinutes(0);

type DateData = {
  year: number;
  month: number;
  day: number;
  timestamp: number;
  dateString: string;
};
export const CalenderSelectScreen: React.FC = () => {
  const navigation = useRootNavigation<'CalenderSelect'>();
  const routes = useRootRoute<'CalenderSelect'>();

  const maxDate = new Date();
  return (
    <View style={{flex: 1}}>
      <Header>
        <Header.Title title="날짜 선택" />
        <Header.Icon iconName="close" onPress={navigation.goBack} />
      </Header>

      <Calendar
        // initialDate={convertToDateString(today.getDate())}
        maxDate={convertToDateString(today.getTime())}
        onDayPress={(day: DateData) => {
          console.log('selected day', day);
          routes.params.onSelectDay(day.timestamp);
          navigation.goBack();
        }}
      />
    </View>
  );
};
