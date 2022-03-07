FROM node:latest

WORKDIR /apps/process

COPY package*.json ./
RUN ["npm","install","global","@nestjs/cli"]
RUN ["npm", "install"]
COPY . .
RUN ["npm", "run", "build"]

EXPOSE 3001

CMD ["npm","run","start"]