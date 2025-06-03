# Use specific Node.js version
FROM node:22.15.0

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# RUN cd /usr/src/app/database_config
# RUN npx sequelize-cli db:migrate

EXPOSE 3000

# RUN ["npx" ,"sequelize-cli", "db:migrate"]
CMD ["npm","run", "docker"]
# CMD ["sh", "./docker-entrypoint.sh"]