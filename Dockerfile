FROM node:8

COPY package.json yarn.lock /api/

WORKDIR /api

RUN yarn

ADD . /api

RUN yarn build

# port
EXPOSE 3000

# start the app
CMD ["node", "dist"]