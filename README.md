# Backend do Sistema de Pedidos de Vendas

Este é o backend para o Sistema de Pedidos de Vendas, desenvolvido com Node.js e Fastify, utilizando MySQL como banco de dados.

## Pré-requisitos

- Docker
- Docker Compose

Se você preferir rodar localmente sem Docker:
- Node.js (versão 14 ou superior)
- MySQL (versão 5.7 ou superior)

## Configuração e Execução com Docker

1. Clone o repositório: https://github.com/xandedj/api-pedidos-vendas


2. Crie um arquivo `.env` na raiz do diretório `backend` com o seguinte conteúdo:
DB_HOST=db DB_USER=root DB_PASSWORD=password DB_DATABASE=sistema_pedidos PORT=3000


3. Certifique-se de que os arquivos `Dockerfile`, `init.sql` e `wait-for-it.sh` estão presentes no diretório `backend`.

4. Volte para a raiz do projeto e execute:
docker-compose up --build


5. O backend estará disponível em `http://localhost:3000`

6. Inicie o servidor:
npm start


7. O backend estará disponível em `http://localhost:3000`.

## Estrutura do Projeto

- `server.js`: Ponto de entrada da aplicação
- `routes/`: Contém os arquivos de rotas
- `controllers/`: Contém os controladores para cada entidade
- `db.js`: Configuração da conexão com o banco de dados
- `init.sql`: Script SQL para inicialização do banco de dados
- `Dockerfile`: Configuração para criar a imagem Docker do backend
- `wait-for-it.sh`: Script para aguardar o MySQL iniciar antes de executar a aplicação

## API Endpoints

A documentação completa da API está disponível via Swagger em `http://localhost:3000/documentation` quando o servidor estiver rodando. Aqui está um resumo dos principais endpoints:

- Produtos:
- GET `/api/produtos`: Lista todos os produtos
- GET `/api/produtos/:id`: Obtém um produto específico
- POST `/api/produtos`: Cria um novo produto
- PUT `/api/produtos/:id`: Atualiza um produto existente
- DELETE `/api/produtos/:id`: Exclui um produto

- Clientes:
- GET `/api/clientes`: Lista todos os clientes
- GET `/api/clientes/:id`: Obtém um cliente específico
- POST `/api/clientes`: Cria um novo cliente
- PUT `/api/clientes/:id`: Atualiza um cliente existente
- DELETE `/api/clientes/:id`: Exclui um cliente

- Pedidos:
- GET `/api/pedidos`: Lista todos os pedidos
- GET `/api/pedidos/:id`: Obtém um pedido específico
- POST `/api/pedidos`: Cria um novo pedido
- PUT `/api/pedidos/:id`: Atualiza um pedido existente
- DELETE `/api/pedidos/:id`: Exclui um pedido

- GET `/api/pedidos/:id/itens`: Lista itens de um pedido específico
- POST `/api/pedidos/:id/itens`: Adiciona um item a um pedido
- PUT `/api/pedidos/:id/itens/:itemId`: Atualiza um item de um pedido
- DELETE `/api/pedidos/:id/itens/:itemId`: Remove um item de um pedido

## Desenvolvimento

Para desenvolvimento, você pode usar o comando `npm run dev` para iniciar o servidor com hot-reloading usando Nodemon.
O script init.sql será copiado para o container do MySQL e executado automaticamente na inicialização do banco de dados.

O Dockerfile do backend agora inclui a instalação do cliente MySQL e um script wait-for-it.sh para garantir que o MySQL esteja pronto antes de iniciar a aplicação Node.js.

O docker-compose.yml foi atualizado para montar o script init.sql no container do MySQL.

Agora, quando você executar docker-compose up --build, o MySQL será iniciado com as tabelas criadas, e a aplicação backend aguardará até que o MySQL esteja pronto antes de iniciar.

Lembre-se de ajustar as configurações de conexão com o banco de dados no seu arquivo server.js ou onde quer que você esteja configurando a conexão com o MySQL. Use as variáveis de ambiente definidas no docker-compose.yml: