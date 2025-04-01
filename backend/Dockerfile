# Use the official Node.js 22 Alpine image
#FROM node:alpine

FROM node:lts-bullseye

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

RUN npm install --save-dev @types/node

#RUN npm rebuild bcrypt --build-from-source

#RUN npx prisma generate --schema="prisma/schema.prisma"

COPY . . 

RUN npx prisma generate --schema="prisma/schema.prisma"


RUN npm run build

WORKDIR /app

EXPOSE 3000

CMD ["node", "dist/server.js"]

