import React from "react";
import { View } from "react-native";
import { Header } from "../components/Header/Header";
import MapView from "react-native-maps";


export const MainScreen: React.FC = () => {
    // latitude : 37.5463 longitude: 127.0536
    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="MAIN" />
            </Header>

            {/* latitudeDelta: 0.015, // 위도 범위
                longitudeDelta: 0.0121 // 경도 범위 */}
            <MapView style={{ flex: 1 }} region={{
                latitude: 37.5463, longitude: 127.0536, latitudeDelta: 0.015, longitudeDelta: 0.0121
            }} />
        </View>
    )
}