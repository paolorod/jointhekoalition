FROM node:8.9

#prepare the node modules
RUN mkdir /install
ADD ["./package.json", "/install"]
WORKDIR /install
RUN npm install --verbose
ENV NODE_PATH=/install/node_modules

RUN mkdir -p /app
WORKDIR /app

RUN npm install -g nodemon
RUN npm config set registry https://registry.npmjs.org
#COPY package.json /app/package.json
#RUN npm install 
COPY . /app

EXPOSE 3000

CMD "npm run"