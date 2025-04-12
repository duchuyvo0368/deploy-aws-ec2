FROM node:14

WORKDIR /eCommerce_Reactjs
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
