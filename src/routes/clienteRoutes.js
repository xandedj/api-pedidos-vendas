const clienteController = require('../controllers/clienteController');

async function routes(fastify, options) {
  fastify.get('/clientes', clienteController.listarClientes);
  fastify.get('/clientes/:id', clienteController.obterCliente);
  fastify.post('/clientes', clienteController.criarCliente);
  fastify.put('/clientes/:id', clienteController.atualizarCliente);
  fastify.delete('/clientes/:id', clienteController.excluirCliente);
}

module.exports = routes;