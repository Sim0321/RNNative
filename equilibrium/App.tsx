/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
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
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { accelerometer } from 'react-native-sensors';


function App(): React.JSX.Element {
  const [value, setValue] = useState({ x: 0, y: 0, z: 0 })

  const accelermoeterValue = useSharedValue({
    x: 0,
    y: 0,
    z: 0
  })

  useEffect(() => {
    const subscription = accelerometer.subscribe(({ x, y, z }) => {
      accelermoeterValue.value = { x, y, z }
      setValue({ x, y, z })
      console.log(x, y, z)
    })

    return () => subscription.unsubscribe()
  }, [accelermoeterValue])

  const leftBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelermoeterValue.value.y
        , [-1, 0], ['red', 'green'])
    }
  })

  const rightBackground = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        accelermoeterValue.value.y, [0, 1], ['green', 'red']
      )
    }
  })

  return (
    <SafeAreaView style={{ flex: 1, }} >
      <View style={{ flex: 1 }}>
        {/* <Text>
          x : {value.x}
        </Text>
        <Text>
          y : {value.y}
        </Text>
        <Text>
          z : {value.z}
        </Text> */}
        <Animated.View style={[{ flex: 1, }, leftBackground]} />
        <Animated.View style={[{ flex: 1, }, rightBackground]} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
