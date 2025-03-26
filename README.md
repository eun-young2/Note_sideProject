# 📎 심플노트

## 기본 화이트모드
![image](https://github.com/user-attachments/assets/97509ca1-dd4a-4506-8c02-c16c5ed056b9)

## 다크모드
![image](https://github.com/user-attachments/assets/33ed047b-9700-408b-8b91-daf3e2df05f1)



## 👀 서비스 소개
* 서비스명: 심플노트
* 서비스설명: 심플노트는 로그인한 사용자만 나만의 메모를 작성하고 열람할 수 있는 개인화 노트 서비스입니다.
              간편한 UI와 다크모드, 노트 검색 및 정렬 기능으로 기록을 더 쉽고 편리하게 관리할 수 있습니다.
<br>

## 📅 프로젝트 기간
2025.03.20 ~ 2025.03.27 (약1주)
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
![image](https://github.com/user-attachments/assets/6674156e-0bed-467c-9021-6a65e417c20a)
![image](https://github.com/user-attachments/assets/f6974f08-cde4-4547-9109-e4c3a967fba2)





<br>

### 노트 수정 및 삭제 페이지
![image](https://github.com/user-attachments/assets/57e9835b-a2ba-429e-ba66-2a216bba9fb0)
![image](https://github.com/user-attachments/assets/5145e275-4798-48a3-bd1d-33931899cf13)







<br>

### 노트 검색
![image](https://github.com/user-attachments/assets/90cf0e7d-989e-4342-97bc-dc41f0736915)
![image](https://github.com/user-attachments/assets/3fccd640-ccb3-455c-b405-3fa9aaa493c2)






<br>

### 회원가입 및 로그인
![image](https://github.com/user-attachments/assets/45998cf9-ecf1-4670-a4e4-560171a6d7d6)
![image](https://github.com/user-attachments/assets/3f6b4fbd-45ec-49eb-94d2-ef456eb2dfc6)




<br>

### DB설계
![image](https://github.com/user-attachments/assets/3ca82cd8-0c83-4c16-b65c-884ddde7b12c)



<br>

## 💡 트러블슈팅
  
*<br>
![image](https://github.com/user-attachments/assets/1b239f60-0f83-4bea-8242-4b90a918b56e)
<br>
*<b>문제 :</b> 닉네임을 화면에 표시하려 했지만, localStorage에 저장된 user 데이터가 [object Object]로 출력, 닉네임이 제대로 뜨지 않는 문제 발생.
<br>
*<b>해결 :</b> <br>
              App.js에서 user 상태를 전역으로 관리하며 localStorage에 저장할 때 JSON.stringify(user)로 문자열로 변환하여 저장.<br>
              useState 초기값을 설정할 때 JSON.parse()를 사용해 문자열을 객체로 복구. <br>
              이렇게 전역으로 관리한 user를 각 페이지에 props로 전달해 닉네임 표시 등 사용자 정보를 안전하게 사용할 수 있도록 개선함.<br>
