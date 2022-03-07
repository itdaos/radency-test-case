FROM node:latest

WORKDIR /apps/api

COPY package*.json ./
RUN ["npm","install","global","@nestjs/cli"]
RUN ["npm", "install"]
COPY . .
RUN ["npm", "run", "build"]

EXPOSE 3000

CMD ["npm","run","start"]