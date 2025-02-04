FROM node:14

# Instalar MySQL client
RUN apt-get update && apt-get install -y default-mysql-client

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

# Copiar o script de inicialização do banco de dados
COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 3000

# Script para aguardar o MySQL iniciar e então executar a aplicação
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

CMD ["/wait-for-it.sh", "db:3306", "--", "node", "server.js"]