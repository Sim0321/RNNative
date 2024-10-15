import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { MainScreen } from "../screens/MainScreen";

const Stack = createNativeStackNavigator()

export const RootNavigation: React.FC = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
            presentation: 'containedModal'
        }}>
            <Stack.Screen name='Main' component={MainScreen} />
            <Stack.Screen name='Add' component={MainScreen} />
            <Stack.Screen name='Detail' component={MainScreen} />

        </Stack.Navigator>
    )
}