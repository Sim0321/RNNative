/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { Icon } from './src/components/Icons';


function App(): React.JSX.Element {


  return (
    <SafeAreaView style={{ flex: 1 }}>

      <Icon name='home' size={16} color='#ff0000' />
    </SafeAreaView>
  );
}



export default App;
