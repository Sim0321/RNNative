import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {MainScreen} from '../screens/MainScreen';
import {AddUpdateScreen} from '../screens/AddUpdateScreen';
import {MonthlyScreen} from '../screens/MonthlyScreen';
import {DetailScreen} from '../screens/DetailScreen';
import {FinancialEdgerHistory} from '../data/FinancialEdgerHistory';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {CalenderSelectScreen} from '../screens/CalenderSelectScreen';

type ScreenParams = {
  Add: undefined;
  Main: undefined;
  Update: {item: FinancialEdgerHistory};
  Detail: {item: FinancialEdgerHistory};
  MonthlyAverage: undefined;
  CalenderSelect: {onSelectDay: (date: number) => void};
};

const Stack = createNativeStackNavigator<ScreenParams>();
export const RootNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        presentation: 'containedModal',
      }}>
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="Add" component={AddUpdateScreen} />
      <Stack.Screen name="Update" component={AddUpdateScreen} />
      <Stack.Screen name="MonthlyAverage" component={MonthlyScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="CalenderSelect" component={CalenderSelectScreen} />
    </Stack.Navigator>
  );
};

export const useRootNavigation = <RouteName extends keyof ScreenParams>() =>
  useNavigation<NativeStackNavigationProp<ScreenParams, RouteName>>();

export const useRootRoute = <RouteName extends keyof ScreenParams>() =>
  useRoute<RouteProp<ScreenParams, RouteName>>();
