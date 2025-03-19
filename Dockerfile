FROM node:alpine as build

COPY package.json package.json
RUN yarn install

COPY . .
RUN yarn build

EXPOSE 8080
CMD ["yarn", "run", "preview", "--host", "--port", "8080"]