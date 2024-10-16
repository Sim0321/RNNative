import React, { useCallback, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { Header } from "../components/Header/Header";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import { getAddressFromCoords, getCoordsFromAddress, getCoordsFromKeyword } from "../utils/GeoUtils";
import { SingleLineInput } from "../components/SingleLineInput";

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

    const [query, setQuery] = useState<string>('')

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

    // 주소 검색
    const onFindAddress = useCallback<() => Promise<void>>(async () => {
        // keyword로 검색하기
        const keywordResult = await getCoordsFromKeyword(query)
        console.log(keywordResult)
        if (keywordResult !== null) {
            setCurrentAddress(keywordResult.address)
            setCurrentRegion({ latitude: parseFloat(keywordResult.latitude.toString()), longitude: parseFloat(keywordResult.longitude.toString()) })
            return;
        }

        const addressResult = await getCoordsFromAddress(query)
        if (addressResult === null) {
            console.error('주소값을 찾기 못했습니다.')
            return
        }
        setCurrentAddress(addressResult.address)
        setCurrentRegion({ latitude: parseFloat(addressResult.latitude.toString()), longitude: parseFloat(addressResult.longitude.toString()) })
    }, [query])

    useEffect(() => {
        getMyLocation()
    }, [getMyLocation])

    return (
        <View style={{ flex: 1 }}>
            {/* <Header>
                <Header.Title title="MAIN" />
            </Header> */}

            <View style={{ position: 'absolute', top: 24, left: 24, right: 24, zIndex: 1 }}>
                <View style={{ backgroundColor: 'white' }}>
                    <SingleLineInput value={query} placeholder="주소를 입력해 주세요" onChangeText={setQuery} onSubmitEditing={onFindAddress} />
                </View>
            </View>

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