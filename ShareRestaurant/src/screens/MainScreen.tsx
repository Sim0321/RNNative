import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "../components/Header/Header";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { getAddressFromCoords } from "../utils/GeoUtils";

type CurrentRegionType = {
    latitude: number,
    longitude: number
}


export const MainScreen: React.FC = () => {
    const [currentRegion, setCurrentRegion] = useState<CurrentRegionType>({
        latitude: 37.5463,
        longitude: 127.0536,
    })

    const [currentAddress, setCurrentAddress] = useState<string | null>(null)

    const onChangeLocation = useCallback<(item: CurrentRegionType) => Promise<void>>(async (item) => {
        setCurrentRegion({
            latitude: item.latitude,
            longitude: item.longitude
        })

        getAddressFromCoords(item.latitude, item.longitude).then(setCurrentAddress)
    }, [])

    const getMyLocation = useCallback(() => {
        Geolocation.getCurrentPosition((position) => {

            onChangeLocation({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            })


        })

    }, [])

    useEffect(() => {
        getMyLocation()
    }, [getMyLocation])

    return (
        <View style={{ flex: 1 }}>
            <Header>
                <Header.Title title="MAIN" />
            </Header>

            {/* latitudeDelta: 0.015, // 위도 범위
                longitudeDelta: 0.0121 // 경도 범위 */}
            <MapView style={{ flex: 1 }} region={{
                latitude: currentRegion.latitude, longitude: currentRegion.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121
            }}
                onLongPress={event => {
                    onChangeLocation(event.nativeEvent.coordinate)
                }}
            >
                <Marker coordinate={{
                    latitude: currentRegion.latitude,
                    longitude: currentRegion.longitude
                }}
                />
            </MapView>

            {currentAddress !== null && (
                <View style={{ position: 'absolute', left: 0, right: 0, bottom: 24, alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ backgroundColor: 'gray', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 30 }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>{currentAddress}</Text>
                    </View>
                </View>
            )}


        </View>
    )
}