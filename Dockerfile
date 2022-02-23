FROM node:16.14.0-alpine

WORKDIR /usr/src/app
ADD . /usr/src/app/

RUN npm ci
RUN npm run build

EXPOSE 3000

CMD ["npm","run","start"]