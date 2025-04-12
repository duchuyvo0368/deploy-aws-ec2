FROM node:14
WORKDIR /eCommerce_Reactjs
COPY package*.json ./
RUN npm install --legacy-peer-deps
RUN npm audit fix || true
RUN npm audit fix --force || true
COPY . .
RUN npm run build
CMD ["npm", "start"]
