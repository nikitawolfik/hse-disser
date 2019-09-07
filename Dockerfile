FROM node:10.6.0 as builder
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN yarn
RUN yarn run build

# production environment
FROM nginx:1.13.9-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY --from=builder /usr/src/app/nginx /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]