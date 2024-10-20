import Reactotron, {trackGlobalLogs} from 'reactotron-react-native';

// import Config from 'react-native-config';

// const REACTOTRON_HOST = Config.REACTOTRON_HOST;
// const host = REACTOTRON_HOST;

// Reactotron 설정
Reactotron.configure({
  name: 'ShareRestaurant', // 프로젝트 이름 설정
  host: '192.168.219.111',
  // ignoreUrls: /android/, // 네트워크 안보이게
})
  .useReactNative() // React Native 플러그인 사용
  // .use(trackGlobalLogs())
  .connect(); // Reactotron 서버에 연결

// if (Platform.OS === 'ios') {
//   // iPhone에서만 Reactotron 로그 활성화

//   console.tron = Reactotron;
//   console.tron.log('iPhone connected');
// } else {
//   // Android일 때 console.tron이 undefined가 되지 않도록 처리

//   console.tron = {
//     log: () => {}, // 빈 함수로 로그를 완전히 무시
//   };
// }

// console.log('Reactotron Configured');
