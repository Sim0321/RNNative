import Reactotron, {trackGlobalLogs} from 'reactotron-react-native';

// Reactotron 설정
Reactotron.configure({
  name: 'FinancialEdger',
  host: '192.168.219.176',
})
  .useReactNative()
  .connect();

console.log('Reactotron Configured');
