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

1. `react-native init[ProjectName] --template templateName`
   - 최초 프로젝트 생성 커맨드
   - templateName에 주로 typescript 관련 template 삽입
2. `react-native run-ios`, `react-native run-android`
   - 앱을 실행 시켜주는 커맨드
3. `react-native start`, `react-native start -- --reset-cache`(캐시가 남아있는 경우에)
   - Metro Bundler를 실행 시켜주는 커맨드
   - webpack과 비슷하게 javascript를 하나의 파일로 만들기 위한 역할
4. `react-native log-android`,`react-native log-ios`
   - android/ios native log를 보기 위한 것

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
      <img src="https://github.com/user-attachments/assets/977b13f8-fd08-4692-86de-b2fd22122ea9"  width="400" height="200"/>
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
  <img src="https://github.com/user-attachments/assets/bfbe654b-9034-4a8d-a717-87605e1e9c13"  width="400" height="200"/>
- ## Android
<img src="https://github.com/user-attachments/assets/850c337e-5ac3-4c26-bfe9-ea48055d31bf"  width="400" height="200"/>

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

<img src="https://github.com/user-attachments/assets/41f0ed72-f582-4258-8fa0-bd641d262e25"  width="400" height="200"/>
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
  <img src="https://github.com/user-attachments/assets/e3347aee-5be5-490d-afad-f8ec7482684a"  width="400" height="200"/>

- 새로운 아키텍처<br>
  <img src="https://github.com/user-attachments/assets/af4a617b-e72c-40a5-afa9-f875a0136b0f"  width="400" height="200"/>

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
  <img src="https://github.com/user-attachments/assets/e16af574-b543-4a84-bfa7-2082db0f425f"  width="400" height="200"/>
- Hermes는 앱 빌드 시간에 parse와 compile등 필요한 작업을 빌드 할 때 하도록 함
- Bytecode 형태로 미리 컴파일 해두면 실행만 시키면 되기 때문<br>

  <img src="https://github.com/user-attachments/assets/9e3770e6-8ec9-415e-b2e1-13691310704c"  width="400" height="200"/>

- 이렇게 Bytecode로 되어있는 bundle을 읽어올 경우 추가적인 장점은(relase build Type으로 확인)<br>
  1. 사용하는 Memory의 감소
  2. AAB / APK 크기 감소 .

## 프로젝트
