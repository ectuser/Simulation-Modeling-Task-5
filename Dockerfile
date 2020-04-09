FROM node:carbon 
WORKDIR /app

COPY . .
RUN npm install

RUN npm run build
RUN npm -g install serve

CMD ["serve", "-s", "dist", "-p", "9000"]
EXPOSE 9000

