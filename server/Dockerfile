FROM node:18-alpine

WORKDIR /app

COPY . .

# Compilar TypeScript
RUN npm run build

# Construir la aplicación
RUN npm run build

EXPOSE 3000

CMD ["pnpm", "tsx", "--env-file=.env", "./src/index.ts"]