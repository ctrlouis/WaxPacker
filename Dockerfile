FROM node:18 AS build
WORKDIR /app
COPY ./client /app/
RUN npm install
RUN npm run build

FROM nginx:latest AS image
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html

FROM nginx:alpine AS image-alpine
WORKDIR /app
COPY --from=build /app/dist /usr/share/nginx/html
