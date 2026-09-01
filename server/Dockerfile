FROM node:lts-slim

WORKDIR /app

COPY . .

RUN npm install -g pnpm@latest

RUN pnpm install

EXPOSE 3000

CMD ["pnpm", "tsx", "--env-file=.env", "./src/index.ts"]