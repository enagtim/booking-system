FROM node:23-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install
ADD . .
RUN npm run build
RUN npm prun --production
CMD ["node", "./dist/main.js"]