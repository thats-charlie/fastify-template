FROM --platform=linux/x86_64 node:16.14.2

RUN mkdir -p /usr/src/app
COPY . /usr/src/app
WORKDIR /usr/src/app

COPY package.json .
RUN npm i --quiet
RUN npm run build 

EXPOSE 8080
CMD ["node", "build/index.js"]