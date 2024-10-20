/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

if (__DEV__) {
  require('./ReactotronConfig.js'); // 동기적으로 Reactotron 설정 파일 불러오기
  console.log('reactotron 연결 완료!!');
}

AppRegistry.registerComponent(appName, () => App);
