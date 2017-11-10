FROM node:boron

COPY package.json yarn.lock /api/

WORKDIR /api

RUN yarn

ADD . /api

RUN yarn build

# port
EXPOSE 3000

# start the app
CMD ["yarn","run", "start"]