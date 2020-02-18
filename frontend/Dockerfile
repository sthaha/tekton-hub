FROM node:12-alpine as tekton-hub
WORKDIR /app

# install deps and the copy the src to speed up docker build
COPY package-lock.json package.json /app/
RUN npm install


COPY tsconfig.json /app/
COPY public /app/public/
COPY src /app/src/
RUN npm run build

# Stage 2 - the production environment
FROM nginxinc/nginx-unprivileged 
COPY --from=tekton-hub /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
EXPOSE 8080



