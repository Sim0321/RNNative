
import Reactotron from 'reactotron-react-native';

// Reactotron 설정
Reactotron.configure({
  name: 'ShareRestaurant' // 프로젝트 이름 설정
})
  .useReactNative() // React Native 플러그인 사용
  .connect(); // Reactotron 서버에 연결

console.log('Reactotron Configured');