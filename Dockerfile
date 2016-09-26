FROM node
RUN mkdir /dorman
ADD . /doorman

WORKDIR /doorman

RUN npm install

ENTRYPOINT [ "npm", "start" ]