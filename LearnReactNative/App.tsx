/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useCallback } from 'react';
import {
  Button,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue } from 'react-native-reanimated';





function App(): React.JSX.Element {
  const value = useSharedValue(0)

  const onPressButton = useCallback(() => {
    value.value = Math.random() * 100
  }, [])

  const animStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: value.value }]
    }
  })
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <View style={{ flex: 1, borderWidth: 1 }}>
        <Button title='박스 움직이기' onPress={onPressButton} />
        {/* <Text>ddidi</Text> */}
        <Animated.View
          style={[
            {
              width: 50, height: 50, borderRadius: 6, backgroundColor: 'blue'
            },
            animStyles
          ]}
        />
      </View>
    </SafeAreaView>
  );
}



export default App;
