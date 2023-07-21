FROM node:18.0-alpine3.14 as build-stage
# Create app directory
WORKDIR /app

RUN npm config set registry https://registry.npm.taobao.org

COPY . .

RUN npm install 

RUN npx prisma init

RUN npx prisma migrate dev --name init

RUN npx prisma generate

RUN npx prisma db seed 

EXPOSE 8888

CMD [ "npm", "start" ]
