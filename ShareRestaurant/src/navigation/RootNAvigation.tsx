import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';

type Screenparams = {
  Main: undefined;
  Add: {latitude: number; longitude: number; address: string};
  Detail: {latitude: number; longitude: number; address: string; title: string};
};

const Stack = createNativeStackNavigator<Screenparams>();

export const RootNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'containedModal',
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={MainScreen} />
      <Stack.Screen name="Detail" component={MainScreen} />
    </Stack.Navigator>
  );
};
