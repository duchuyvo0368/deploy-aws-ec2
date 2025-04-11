# Sử dụng image chính thức của Node.js phiên bản 14
FROM node:14
WORKDIR /eCommerce_Reactjs
COPY package*.json ./
RUN npm install
COPY . .
CMD npm run start
