FROM node:18

WORKDIR /app/client

COPY ./client.js ./

CMD ["node", "client.js"]