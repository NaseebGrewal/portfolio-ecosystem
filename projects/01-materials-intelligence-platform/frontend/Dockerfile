FROM node:20-alpine AS base

WORKDIR /app

ENV PATH="/app/node_modules/.bin:$PATH"

COPY package.json ./
RUN npm install

COPY . .

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=development

CMD ["npm", "run", "dev"]
