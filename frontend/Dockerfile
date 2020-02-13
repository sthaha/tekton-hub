#FROM node:12.13.0-alpine as build-app

#WORKDIR /app
#COPY . .
#RUN npm install
#RUN npm build 

#FROM nginx:1.12-alpine
#FROM nginxinc/nginx-unprivileged 
#RUN chgrp -R 0 /var/cache/nginx/client_temp
#RUN chmod -R g=u /var/cache/nginx/client_temp
#COPY --from=build-app /app/build /usr/share/nginx/html
#EXPOSE 8080
#CMD ["nginx", "-g", "daemon off;"]

FROM node:12-alpine
WORKDIR /app
COPY . .
RUN npm install && \
    npm run build
EXPOSE 8080
CMD npm run start
