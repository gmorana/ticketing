FROM node:alpine

WORKDIR /app
COPY package.json .
RUN npm install
RUN npm build
COPY . .
CMD ["npm", "run", "dev"]
