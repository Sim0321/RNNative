# RN 네이티브 시작기

## 학습

- react native는 두가지 방식으로 프로젝트를 만들 수 있음

1. Expo CLI

   - Expo SDK에서 지원하지 않으면 -> bare workflow로 eject 해야했음
   - 변경하더라도 expo에 관련된 모듈이 남아있는 이상 expo에 모듈이 있는 채로 build -> 앱의 빌드가 커짐 -> 앱을 받을 때 시간이 많이 걸림

2. React-Native CLI
   - react-native만 설치되어 있으면 됨
   - 초기에 구성시 여러가지를 설치해야하기 때문에 난이도가 있는 편
   - 대신 원하는 네이티브 모듈 추가 가능
   - React-Native에 필요한 모듈만 탑재

## 명령어

1. `npx react-native init 프로젝트 이름`
   - 최초 프로젝트 생성 커맨드
2. `react-native run-ios`, `react-native run-android`
   - 앱을 실행 시켜주는 커맨드
3. `react-native start`, `react-native start -- --reset-cache`(캐시가 남아있는 경우에)
   - Metro Bundler를 실행 시켜주는 커맨드
   - webpack과 비슷하게 javascript를 하나의 파일로 만들기 위한 역할
4. `react-native log-android`,`react-native log-ios`
   - android/ios native log를 보기 위한 것
5. `yarn start --reset-cache`
   - metro server 초기화 및 재시작

## Dependency Manager

1. Gradle
   - android dependency manager
   - android 폴더 하위에 build.gradle이라는 이름으로 존재
     - android/build.gradle : 전체 라이브러리에서 사용하는 디펜던시의 버전을 종합적으로 관리(ex:: kotlin maven version), 디펜더시 별로 각자 다른 버전을 가지고 있지 않게 하는 역할
     - android/app/build.gradle : 작성하는 app module의 dependency들을 관리
2. cocoapods
   - ios 프로젝트 내부에서 Dependency 관리를 위한 tool
   - ios 폴더 하위 Podfile

### Auto-linking

- React-Native 0.60.0 버전부터 가능
- 별도로 설정하지 않더라도 build time에 라이브러리를 Link할 수 있는 기능
- cocoapod이나 build.gradle 파일을 많이 열어보지 않아도 됨

## Dubugger tool

### Flipper

- 2020년도에 발표된 모바일 디버깅 툴
- React-Native 0.62버전부터 기본으로 내장되어 사용

1. Layout Inspector
   - Layout Inspector를 통해 현재 View의 상태를 바로 알수 있는 기능 제공
2. React Dev Tools
   - Layout Inspector에서 제공하는 기능에 state를 더해 볼 수 있음
3. Images
   - 현재 화면에 보이고 있는 이미지가 나열 됨(Android제공)
4. Databases
   - Mobile 환경에서의 Database가 어떻게 구성되어 있는지 제공
5. Setup Doctor
   - 동작을 제대로 안하는 경우에는 Setup Doctor Tool로 점검 가능

## ios/ android에서 알아야 하는 것

- Android
  - Application
    - 안드로이드 Application에서 전체 앱 상태를 관리하는 class
    - Event를 전달하기 위한 함수를 제공
      - onCreate : 어플리케이션이 실행될 때 최초에 호출
      - onTerminate : 어플리케이션이 종료될 때 호출
  - Manifest
    - Android 앱의 메타 정보를 요약해서 선언해둔 것
    - 권한, 이름, 패키지명 등 앱의 전반적인 내용들을 담고 있음
  - Activity
    - 안드로이드에서 화면을 구성하는 요소
    - 유저가 직접 보고, 누르는 등의 액션이 발생됨
    - 안드로이드의 4구성 요소(activity, service, receiver, content provider)
  - Intent
    - 어떤 Activity를 호출할 때 사용하는 것
    - 매개변수와 함께 보내는 것
    - navigation을 이동했던것과 비슷한 형태
  - Activity Life-cycle
    - onCreate -> onResume -> onPause -> onDestroy
- Ios

  - IOS App Status
    - Not running -> Inactive(Foreground) -> Active(Foreground) -> Background -> Suspended
      <img src="./image/ios_app_status.png"  width="500" height="300"/>
  - AppDelegate

    - Android에서 activity처럼 화면을 구성하는 단위
    - 각각 앱의 상태에 따라 불려지게 되는 함수가 있음
      - didFinishLaunchingWithOptions : 앱이 최초 실행될때 호출되는 함수 (Android의 onCreate와 비슷)
      - info.plist : 권한 앱의 이름, 실행시 주로 필요한 값들을 관리 해주는 파일, SDK API Key값, 권한 요청시 텍스트 등 값을 관리

  - 안드로이드와의 추가적인 차이점
    - ios의 에디터가 더 많은 것을 지원
    - Build Phase : 앱을 실행 시킴에 있어 필요한 값들을 자동으로 설정하도록 Command로 모두 선언해둔 것

### Permissions

- 특정 리소스를 필요로 할 때 사용자에게 허용 할것인지 물어보는 것
- ## Ios Permissions flow

  <img src="./image/ios_permission_flow.png"  width="400" height="200"/>

- ## Android
  <img src="./image/android_permission_flow.png"  width="400" height="200"/>

### 자주 사용하는 권한

1. 사진 관련
   - ios : NSPhotoLibraryUsageDescription
   - android : READ_EXTERNAL_STORAGE
2. 카메라 관련
   - ios : NSCameraUsageDescription
   - android : WRITE_EXTERNAL_STORAGE
3. 위치 관련
   - ios
     - NSLocatijonAlways
     - WhenInUseUsageDescription
   - android
     - ACCESS_FINE_LOCATION<>
     - ACCESS_COARSE_LOCATION
     - ANDROID_BACKGROUND_LOCATION
4. App Tracking Transparency
   - IDFA를 읽어오는 권한
   - iOS앱 심사시 필수로 보고 있는 정보

### Scheme

- 외부에서 우리 앱을 호출하거나, 우리 앱이 외부앱을 호출하는 수단(ex: 앱 결제)
  > test://path/to/screen <br/>
  > test:// 가 scheme, path/to/screen이 path
- android
  - intent-filter를 통해서 정의
- iOS
  - info.plist > URL Types에 저장

## React Native 동작 원리

<img src="./image/rn_동작원리.png"  width="400" height="200"/> <br>

- Thread란?
  - 실행되는 프로세스 내에서 실제로 작업을 실행하는 주체
  - 명령어를 실행하여 처리하는 주체

### React-Native Thread

1. Main Thread or UI Thread
   - Native 영역에 레이아웃을 그려주는 역할
2. JavaScript Thread
   - 작성한 JS가 실행되는 곳
3. Shadow Thread
   - virtual Dom으로부터 새로운 Layout으로 변환하도록 계산해주는 역할
4. Native Module Thread
   - Native Module을 다룰 때 사용하게 되는 Thread
   - 특정 리소스등을 요청하고자 할 때 사용

### 동작 과정

1. 앱에 진입하면 MainThread가 JS Bundle을 load > JS Thread로 전송
2. JS Thread에서 Diffing 작업 수행 후 완료시점에 Shadow Thread로 이동
   - Diffing이란?
     - virtual DOM과 실제 DOM element를 비교하며 변경되었는지 체크
3. Shadow Thread에서 Diffing이 끝난 후에 반영할 Layout을 계산 하고 Main Thread에 계산된 Layout을 전달 > Main Thread는 계산된 Layout 반영
4. 그 후 이미 JS를 load해왔기 때문에 diffing 작업 수행 (반복)

### 그렇다면 MainThread와 Js Thread는 언어가 다른데 어떻게 데이터가 오가는 것인가??

- 그것은 바로 **React-Native Bridge**
- Bridge는 Javascript와 Native가 서로 소통하게 할 수 있도록 돕는 역할
- 변수들을 JSON형태로 변경하는데 이 과정에서 많은 리소스 생김

## Native Module이란?

- Native API를 사용하기 위한 것
- 주로 현재 위치, wifi 상태 등 native 영역에서만 알고 있는 정보에 접근하는 것
- 또는, image processing처럼 연산이 native의 높은 performance가 필요할 때 사용
- 두 가지를 다룸
  1.  Native UI Component  
      1-1. View에 대한 Native Module <br>
      1-2. 주로 카메라 등 연산이 많은 View에 대해서 작성
  2.  Native Module  
      2-1. 로직/연산에 대한 Native Module <br>
      2-2. 어떤 Native Library의 함수를 호출할 때 사용

## New Architecture

- [참조링크](https://reactnative.dev/blog/2024/04/22/release-0.74)

- 왜 새로운 아키텍처?
  - Bridge가 가지고 있는 본질적인 문제를 해결하기 위함
- Bridte가 가진 제한점

1. 비동기 처리<br>
   1-1. JS Thread가 Native에 특정 리소스를 요청하면 결과값은 비동기(Promise)로 처리되기 때문에 기다려야 함
2. 싱글 스레드 <br>
   2-1. JS가 싱글스레드에서 동작하기 때문에 Bridge도 싱글 스레드로 동작
3. 변환시 드는 과도한 비용<br>
   3-1. Bridge로 이동하게 될 때 JSON Object 변환하는 비용이 큼

- 이러한 이유 때문에 기존에 있던 Bridge를 버리고, JSI가 해당 역할을 대신 하도록 수정

  - JSI(Javascript Interface) : C++ 객체에 대한 참조를 할 수 있게 해주는 역할

- 기존 아키텍처 <br>
  <img src="./image/old_architecture.png"  width="400" height="200"/>

- 새로운 아키텍처<br>
  <img src="./image/new_architecture.png"  width="400" height="200"/>

- 새로운 아키텍처 도입 후 얻은 것
  1.  동기 실행이 가능하게 됨
      - C++ 모듈로 직접 접근을 할 수 있다보니 비동기 통신이 아니어도 됨
  2.  동시성
      - Js에서 다른 스레드에 있는 함수를 호출 할 수 있게 됨
  3.  Overhead 감소
      - JSON Object로 변환하지 않고 C++ 언어로 통신하게 되었기 때문
  4.  iOS, Android간 내부 네이티브 모듈 코드 공유 가능
      - C++이 추가됨으로 인하여 플랫폼이 다르더라도 한 개의 코드로 관리 가능
  5.  타입의 안정성
      - 자동으로 생성되는 코드 레이어에 의해서 자동으로 타입을 생성하도록 되어있음

### 아키텍처 정리

- 기존에는 Bridge를 통해 JS와 Native를 연결하던 방식이 Bridge를 제거하고 Fabric과 JSI가 도입됨.
- 이는 RN 0.7 버전에서 시작되었고(아키텍처 전환 시작)
- 0.75 버전에서 BridgeLess모드가 기본으로 설정됨.
- 추가
  - 0.60 버전은 네이티브 모듈의 Auto Link 기능과 CocoaPods 기본 지원

### Fabric이란?

- New Architecture의 새로운 rendering system
- 이전 Architecture에서는 UI Manager가 담당하던 부분
- Shadow Thread에서 새로운 Shadow Tree를 계산하던 로직을 C++로직으로 변환 가능하도록 수정
- onLayout, onMeasure 등 View의 위치, 사이즈등을 계산하던 로직을 비동기에서 동기함수로 변환했기 때문에 많은 퍼포먼스 이득

### Turbo NativeModules

- 기존 Architecture에서는 Native Module로 사용되던 것
- Bridge가 사라지게 되면서 추가 됨
- 장점 <br>
  1.  Platform 전반적으로 Typecheck가 잘됨
  2.  플랫폼 별 코드 공유가 쉬움(C++로 작성된 코드를 공유)
  3.  Native Module Lazy Loading이 적용됨

### CodeGen

- 3rd-party libarary에서 제공되는 코드를 인터페이스에 맞게 작성하면 JSI관련 코드들을 만들어 주는 것
- 프로젝트를 빌드 할 때 자동으로 실행(빌드시간에 영향)

### Hermes

- Facebook에서 만든 javascript Engine
- Bytecode 형태로 미리 컴파일 하여 저장 해 둔 뒤 사용
- 즉, 앱이 최초 로딩시 js bundle 파일을 읽어와 동작 가능한 javascript로 compile 하게되는데
- 이 과정이 대략 4초(Android 기준) 정도 걸리는 것으로 파악. <br>
  <img src="./image/no_hermes.png"  width="600" height="200"/>
- Hermes는 앱 빌드 시간에 parse와 compile등 필요한 작업을 빌드 할 때 하도록 함
- Bytecode 형태로 미리 컴파일 해두면 실행만 시키면 되기 때문<br>

  <img src="./image/hermes.png"  width="600" height="200"/>

- 이렇게 Bytecode로 되어있는 bundle을 읽어올 경우 추가적인 장점은(relase build Type으로 확인)<br>
  1. 사용하는 Memory의 감소
  2. AAB / APK 크기 감소 .

## react-native-reanimated

- React-Native에서 Animation을 Frame drop 없이 사용가능 하도록 만든 패키지
- React-Native Animated가 가지고 있는 단점을 해결
  - Main Thread와 JS Thread의 통신(병목 현상 발생)
  - <img src="./image//animated_단점.png"  width="600" height="200"/>
- 위와 같은 단점이 있어 react-native-reanimated는 animation 관련된 작업을 모두 Main Thread에서 실행
- worklet을 이용하여 JS Thread로 전달

### worklet

- wroklet react-native-reanimated V2에 생김
- 작은 조각의 javascript조각
- 뷰 속성을 업데이트 하거나, 이벤트에 반응할 때 UI Thread에서 바로 실행시킬 수 있는 JS 조각
- 사용법
  ```js
  const value = 50;
  const funcA = () => {
    "worklet" //함수 외부에 있는 값을 사용하더라도 함께 가져감
    ... logic
  }
  ```

### shared values

- JS Thread와 Main Thread 모두에서 읽기 또는 수정이 가능한 값
- Main Thread에서는 값이 변경됨을 바로 감지할 수 있어 읽기에 특화 됨

## Sensor

### 가속도 센서란?

- 핸드폰의 움직임을 감지하기 위해 사용하는 센서
- x,y,z로 좌표를 만들고 핸드폰이 움직임에 따라 변경된 값이 나옴
- 자이로스코프 센서와 함께 사용되는 편

### 자이로스코프 센서란?

> Gyro: 회전하는 것

- 핸드폰의 회전동작을 감지하고, 어느 방향인지 감지해서 어느정도로 회전 되어있는지를 감지하기 위한 것

### Patch-package란?

- 라이브러리가 잘못되었을 경우에 패치 하는 방법 <br>
  1. Github에 fork를 통해 내 소유의 Repo로 전환이후 잘못된 부분에 대한 commit을 통한 수정. 이후 원래 repo에서 해당 내용을 patch하게 되는 경우, 애써 만들었던 내용을 온전히 버려야 함
  2. patch-package 사용. npm install 이후에 스크립트를 사용하여 버전을 비교한 뒤 지정한 패치 내용이 적용 되는 것

### react-native-sqlite-storage

- SQLite를 react-native에서도 사용 가능하도록 만든 패키지

#### SQL이란?

- Structured Query Language의 약자 "구조화 된 질의 언어". 즉, 데이터 베이스에서 데이터를 가져오기 위한 언어

#### 관계형 데이터베이스란?

- 표를 만드는 것처럼 데이터를 구조화 시켜 저장하는 것. SQL은 표에 있는 데이터들을 가져오도록 명령하는 언어

1. INSERT
   - 어떠한 값을 추가하기 위한 구문
   - `INSERT INTO table_name($column1, $column2, $column3)`
2. UPDATE
   - 어떠한 값을 수정하기 위한 구문
   - `UPDATE table_name`
3. DELETE
   - 어떠한 값을 삭제하기 위한 구문
   - `DELETE FROM table_name WHERE ${value}={value}`
4. SELECT
   - 어떠한 값을 조회하기 위한 구문
   - `SELECT*FROM table_name WHERE value={value}`

#### SQLite

- SQL + Lite의 합성어
- 모바일 환경에 적합하게 가볍게 설계 되어있음
- 앱을 만드는데 있어서 필요한 만큼의 기능들은 제공됨

## 프로젝트

<details>
<summary>맛집 공유 앱</summary>
  <div markdown="1">

### TO-DO

1. ios, android kakao Map으로 통일시키기

### ISSUE

- ios

  - 첫 렌더링 시 파란색 핀들의 title, desciption 말풍선이 잘 나오지만, 현위치의 빨강색 핀을 누른 이후에는 파란색 핀들의 말풍선이 생겼다 빠르게 사라지는 이슈

    </div>
  </details>
