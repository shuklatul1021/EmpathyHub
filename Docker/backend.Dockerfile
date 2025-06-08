from node:22-alpine

WORKDIR /Backend

COPY ./backend/package.json .
COPY ./backend/package-lock.json .

RUN npm install
COPY ./backend .
RUN npm run db:generate
RUN npm run build
EXPOSE 3000

CMD [ "npm" , "run" ,"dev" ]