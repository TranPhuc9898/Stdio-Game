FROM node:16-alpine

ARG RELEASE

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app

COPY package.json ./package.json
RUN yarn install --network-timeout 1000000

COPY --chown=node:node . .

# RUN yarn env ${RELEASE}
RUN yarn build

RUN yarn remove $(node tools/get-packages.js dev)

ENV PORT 3000
EXPOSE 3000

CMD ["yarn", "start"]