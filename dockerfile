FROM node:20-alpine

WORKDIR /home/node/screen-sharing-web-app

COPY package.json .

COPY pnpm-lock.yaml .

RUN npm install -g pnpm

RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

EXPOSE 3000

CMD [ "node", "./.output/server/index.mjs"]
