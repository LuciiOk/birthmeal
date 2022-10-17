FROM node:16.16.0 as build

WORKDIR /app
COPY package*.json .
RUN npm install

COPY . .
RUN npm run build

FROM node:16.16.0
WORKDIR /app

COPY package.json .
RUN npm install --only=production
COPY --from=build /app/dist ./dist

EXPOSE 3000
CMD npm run start:prod
