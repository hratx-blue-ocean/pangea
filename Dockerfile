# Download base image ubuntu 16.04
FROM alpine:3.7


# Update ubuntu and install node and npm
RUN apk update
RUN apk add --update nodejs nodejs-npm

WORKDIR /pangea

ENV PATH /node_modules/.bin:$PATH

COPY /package.json ./
COPY /package-lock.json ./

COPY /client/package.json ./client
COPY /client/package-lock.json ./client

COPY /server/package.json ./server
COPY /server/package-lock.json ./server

#  install dependancies
RUN cd .. npm run setup;

#copy source code into container
COPY . ./



# select port
EXPOSE 9000

# run commands to start app
CMD ["npm", "run", "start:devDocker"]