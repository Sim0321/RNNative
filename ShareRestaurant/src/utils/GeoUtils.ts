import Config from "react-native-config";

const KAKAO_API_KEY = Config.KAKAO_API_KEY
export const getAddressFromCoords = (
    latitude: number,
    longitude: number
): Promise<string | null> => {
    return fetch(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`, {
        method: 'GET',
        headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`
        }
    }).then(result => result.json()).then(result => {


        if (result.meta.total_count === 0) {
            return null
        }

        if (result.documents.length === 0) {
            return null
        }

        const addressItem = result.documents[0]
        return addressItem.address.address_name
    })

}
