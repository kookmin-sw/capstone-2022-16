[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-f059dc9a6f8d3a56e377f745f24479a46679e63a5d9fe6f495e02850cd0d8118.svg)](https://classroom.github.com/online_ide?assignment_repo_id=7224874&assignment_repo_type=AssignmentRepo)

## 팀소개 및 페이지를 꾸며주세요.

- 프로젝트 소개
  - 프로젝트 설치방법 및 데모, 사용방법, 프리뷰등을 readme.md에 작성.
  - Api나 사용방법등 내용이 많을경우 wiki에 꾸미고 링크 추가.
 

- 팀페이지 꾸미기
  - 프로젝트 소개 및 팀원 소개
  - index.md 예시보고 수정.

- GitHub Pages 리파지토리 Settings > Options > GitHub Pages 
  - Source를 marster branch
  - Theme Chooser에서 태마선택
  - 수정후 팀페이지 확인하여 점검.

**팀페이지 주소** : https://kookmin-sw.github.io/capstone-2022-16/ '{{자신의 리파지토리 아이디}}'



## 내용에 아래와 같은 내용들을 추가하세요.

### 1. 프로젝트 소개

당근마켓과 5일장의 컨셉을 섞어서, 망치나, 데일밴드, 충전기, 티슈, 휴지등 중고나라나 당근마켓에서는 팔기 사소하고 귀찮지만 버리기 아까운 물건들을,
한날 한시 한장소에 여러명이 모여 한꺼번에 대량으로 거래를 주고받는걸 도와주는 플랫폼.

### 2. 소개 영상

프로젝트 소개하는 영상을 추가하세요

### 3. 팀 소개

### 팀이름: FLEA-MARKET

#### 조장: 김병관
역할: 백엔드 및 DB

#### 조원1: 강찬우
역할: 프론트엔드

### 4. 사용법

#### 환경설정
##### 1.데이터베이스 h2(임시) 설치 (https://www.h2database.com/html/download-archive.html)
##### 2.자바버전 11.0.2 (build 11.0.2+9) 설치. (https://jdk.java.net/archive/)
##### 3.자바 환경변수 추가.
###### 3-1.C:\Program Files 폴더에 OpenJDK 폴더 생성
###### 3-2.openjdk-11.0.1_windows-x64_bin.zip 압축해제
###### 3-3.jdk-11.0.1 폴더를 OpenJDK 폴더 안으로 이동
###### 3-5.시스템 환경변수 등록 (JAVA_HOME(변수명)	C:\Program Files\OpenJDK\jdk-11.0.1(값)
###### 3-8.Path에 %JAVA_HOME%\bin 등록
##### 4.노드버전 ? 설치 /// 리액트버전:17.0.2 (참고)
##### 5.노드 환경변수 추가
##### 6.인텔리제이 설치 (https://www.jetbrains.com/idea/download/#section=windows)
##### 7.frontend 폴더내에서 ```npm install```

#### 실행방법
##### 6.backend 내의 build.gradle을 찾아 프로젝트로 연후 backend/core/core/src/main/java/fleamarket/core/CoreApplication.java를 실행
##### 7.frontend 폴더내에서 ```npm start```

### 5. 기타
