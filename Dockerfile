FROM node:16.3.0-alpine
WORKDIR /app
COPY ./package.json /app/
COPY ./package-lock.json /app/
RUN npm i --silent
COPY . /app
CMD [ "npm", "run", "start" ]