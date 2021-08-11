FROM node:14-alpine

WORKDIR /backend
COPY package.json ./
COPY tsconfig.json ./
COPY . ./
RUN npm install
RUN npm run build

FROM node:14-alpine
WORKDIR /backend
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /backend/build .

EXPOSE 5000
CMD [ "node", "start.js" ]