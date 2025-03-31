# Use the official Node.js 22 Alpine image
FROM node:22

RUN ["apt-get", "update"]
RUN ["apt-get", "install", "-y", "vim"]

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install --omit=dev

RUN npm rebuild bcrypt --build-from-source

RUN npx dotenv -e .env -- npx prisma generate

COPY . . 

RUN npm run build

WORKDIR /app/dist

EXPOSE 3000

CMD ["node", "server.js"]

