# 베이스 이미지 설정
FROM node:14

# 작업 공간 설정
WORKDIR /usr/src/app

# 패키지.json 파일을 Docker 컨테이너에 복사
COPY package*.json ./

# 패키지 설치
RUN npm install

# 프로젝트의 모든 파일을 Docker 컨테이너에 복사
COPY . .

# 앱 빌드
RUN npm run build

# Nginx를 이용하여 React 앱을 서비스
FROM nginx:1.19.0-alpine

COPY --from=0 /usr/src/app/build /usr/share/nginx/html
