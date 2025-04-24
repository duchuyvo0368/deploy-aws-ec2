# --- Build Phase ---
FROM node:16 AS build
WORKDIR /eCommerce_Reactjs
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# --- Serve Phase ---
FROM node:16
WORKDIR /eCommerce_Reactjs
RUN npm install -g serve
COPY --from=build /eCommerce_Reactjs/build ./build
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "3000"]
