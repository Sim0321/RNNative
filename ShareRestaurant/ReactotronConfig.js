
import Reactotron from 'reactotron-react-native';
const host = '192.168.219.67'

// Reactotron 설정
Reactotron.configure({
  name: 'ShareRestaurant', // 프로젝트 이름 설정
  host,
  port: 9090,
})
  .useReactNative() // React Native 플러그인 사용
  .connect(); // Reactotron 서버에 연결

console.log('Reactotron Configured');