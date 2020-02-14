FROM node:12-alpine
WORKDIR /app

# install deps and the copy the src to speed up docker build
COPY package-lock.json package.json /app/
RUN npm install


COPY tsconfig.json /app/
COPY public /app/public/
COPY src /app/src/

EXPOSE 8080
CMD npm start
