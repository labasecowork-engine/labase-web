# Etapa 1: build
FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa 2: runtime con solo dependencias de prod
FROM node:20-alpine as runtime

WORKDIR /app
COPY --from=builder /app .

RUN npm ci --omit=dev

ENV HOST=0.0.0.0
ENV PORT=4321
EXPOSE 4321

CMD ["node", "./dist/server/entry.mjs"]
