from node:22-alpine

WORKDIR /Frontend

COPY ./Frontend/package.json .
COPY ./Frontend/package-lock.json .

RUN npm install
COPY ./Frontend .

EXPOSE 5173

CMD [ "npm" , "run" , "dev" ]