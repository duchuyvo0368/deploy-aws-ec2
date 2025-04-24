# --- Build Phase ---
FROM node:18 AS build
WORKDIR /eCommerce_Reactjs
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
# Set environment variables for the build
ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=https://voduchuy.work.gd/
ENV REACT_APP_IS_LOCALHOST=1
ENV REACT_APP_FACEBOOK_APP_ID=572043240792
ENV REACT_APP_ROUTER_BASE_NAME=
ENV SKIP_PREFLIGHT_CHECK=true
# Run the build with more verbose output
RUN npm run build || (cat /eCommerce_Reactjs/npm-debug.log && exit 1)

# --- Serve Phase ---
FROM node:18
WORKDIR /eCommerce_Reactjs
RUN npm install -g serve
COPY --from=build /eCommerce_Reactjs/build ./build
EXPOSE 5000
CMD ["serve", "-s", "build", "-l", "3000"]
