FROM node:16.18-alpine as builder


WORKDIR /vue-ui

RUN node -v

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build


FROM nginx:alpine as production-build
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /vue-ui/dist /usr/share/nginx/html

ENTRYPOINT ["nginx", "-g", "daemon off;"]
