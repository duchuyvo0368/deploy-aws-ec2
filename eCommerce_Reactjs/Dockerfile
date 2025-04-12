# Build React app
FROM node:16 AS build

WORKDIR /eCommerce_Reactjs
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Serve static files with serve
FROM node:16-slim

# Cài serve để phục vụ build
RUN npm install -g serve

WORKDIR /app
COPY --from=build /app/build ./build

# Expose port (Render sẽ mặc định dùng 3000)


# Serve build folder trên port 3000
CMD ["serve", "-s", "build", "-l"]
