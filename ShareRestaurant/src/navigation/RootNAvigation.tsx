import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import React from 'react';
import {MainScreen} from '../screens/MainScreen';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AddScreen} from '../screens/AddScreen';
import {DetailScreen} from '../screens/DeatilScreen';

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
      <Stack.Screen name="Add" component={AddScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof Screenparams>() =>
  useNavigation<NativeStackNavigationProp<Screenparams, RouteName>>();

export const useRootRoute = <RouteName extends keyof Screenparams>() =>
  useRoute<RouteProp<Screenparams, RouteName>>();
