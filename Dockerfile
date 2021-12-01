FROM node:15

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY ./ /app

# RUN npx prisma migrate dev
RUN npx prisma generate

RUN npm run build

# RUN mv prisma build/
# COPY .env ./build/

ENV PORT=5000

EXPOSE ${PORT}

CMD npm start