# 📎 심플노트

## 기본 화이트모드
![캡처](https://github.com/user-attachments/assets/4ffb6d6e-5902-41e4-b411-fab106de4553)
## 다크모드
![캡처](https://github.com/user-attachments/assets/c5abb741-5c29-496f-8b82-f8983b3aa54d)


## 👀 서비스 소개
* 서비스명: 심플노트
* 서비스설명: 심플노트는 로그인한 사용자만 나만의 메모를 작성하고 열람할 수 있는 개인화 노트 서비스입니다.
              간편한 UI와 다크모드, 노트 검색 및 정렬 기능으로 기록을 더 쉽고 편리하게 관리할 수 있습니다.
<br>

## 📅 프로젝트 기간
2025.03.20 ~ 2025.03.31 (약2주)
<br>

## ⭐ 주요 기능
* 회원가입 및 로그인
* 노트 등록 / 수정 / 삭제
* 노트 정렬
* 노트 검색
<br>

## ⛏ 기술스택
* React
* Node.js
* MySQL

<br>

## 🖥 화면 구성

### 노트 등록 페이지
![image](https://github.com/user-attachments/assets/96fbf1cf-dad6-44d1-b401-c93a1b3a9f62)
![image](https://github.com/user-attachments/assets/42020c67-d310-4ed9-9915-8d8732c4307f)





<br>

### 노트 수정 및 삭제 페이지
![image](https://github.com/user-attachments/assets/e567a2a2-c70b-4f3c-a111-e6801155e00b)
![image](https://github.com/user-attachments/assets/7af2cf70-3522-453d-a03e-f218bbeb7f9f)





<br>

### 노트 검색
![image](https://github.com/user-attachments/assets/53b1c883-51db-4b1c-8149-2dcf18121ec1)
![image](https://github.com/user-attachments/assets/2090bb1e-0b5b-460d-80b9-6d644143f9eb)




<br>

### 회원가입 및 로그인
![image](https://github.com/user-attachments/assets/45998cf9-ecf1-4670-a4e4-560171a6d7d6)
![image](https://github.com/user-attachments/assets/3f6b4fbd-45ec-49eb-94d2-ef456eb2dfc6)




<br>

### DB설계
![image](https://github.com/user-attachments/assets/84d61850-fc1a-4c79-930e-56551c0882a2)


<br>

## 💡 트러블슈팅
  
*<br>
![image](https://github.com/user-attachments/assets/1b239f60-0f83-4bea-8242-4b90a918b56e)
<br>
*문제 : 닉네임을 파싱해야하는데 계속 object로 파싱되서 닉네임이 안뜨는 문제 발생
<br>
*해결 : App.js에서 user를 전역으로 관리했기 때문에 JSON.stringify해서 문자열로 저장 <br>
        JSON.parse해서 문자열 파싱 및 props로 각 페이지에서 쓸 수 있게 만듦
