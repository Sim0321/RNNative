
import Reactotron from 'reactotron-react-native';

import Config from "react-native-config";

const REACTOTRON_HOST = Config.REACTOTRON_HOST
const host = REACTOTRON_HOST


// Reactotron 설정
Reactotron.configure({
  name: 'ShareRestaurant', // 프로젝트 이름 설정
  host,
  port: 9090,
})
  .useReactNative() // React Native 플러그인 사용
  .connect(); // Reactotron 서버에 연결

console.log('host ::', host)
console.log('Reactotron Configured');