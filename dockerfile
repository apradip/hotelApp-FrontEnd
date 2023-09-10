FROM node:alpine
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package.json ./
COPY package-lock.json ./
COPY sslcert ./
RUN npm install
RUN npm i react-scripts
COPY . ./
CMD ["npm", "start"]