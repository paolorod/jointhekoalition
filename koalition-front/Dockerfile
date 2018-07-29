FROM node:8.9

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g nodemon
#RUN npm config set registry https://registry.npmjs.org
COPY package.json /app/package.json
RUN npm install 
#COPY . /app

EXPOSE 3000

CMD "npm run"