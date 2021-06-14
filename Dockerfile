FROM node:14-slim

WORKDIR /usr/src/app

RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/dashboard

# server part of the code
COPY server/package.json /usr/src/app
COPY server/package-lock.json /usr/src/app
RUN npm ci

COPY server/dist /usr/src/app/server
COPY server/database.json /usr/src/app

# dashboard part of the code
COPY dashboard/build /usr/src/app/dashboard

ENTRYPOINT ["node", "server/server.js"]



