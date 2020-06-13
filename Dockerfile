# Download base image ubuntu 16.04
FROM node:10


# Update ubuntu and install node and npm
# RUN apk update
# RUN apk add --update nodejs nodejs-npm

WORKDIR /pangea

COPY /package.json ./
# COPY /package-lock.json ./

COPY /client/package.json ./client
# COPY /client/package-lock.json ./client

COPY /server/package.json ./server
# COPY /server/package-lock.json ./server


#copy source code into container
COPY . /pangea

#  install dependancies
RUN npm run setup;
# select port
EXPOSE 9000

RUN npm rebuild node-sass@4.12.0
# run commands to start app
CMD ["npm", "run", "start:docker"]