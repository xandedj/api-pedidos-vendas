const pedidoController = require('../controllers/pedidoController');

async function routes(fastify, options) {
  fastify.get('/pedidos', pedidoController.listarPedidos);
  fastify.get('/pedidos/:id', pedidoController.obterPedido);
  fastify.post('/pedidos', pedidoController.criarPedido);
  fastify.put('/pedidos/:id', pedidoController.atualizarPedido);
  fastify.delete('/pedidos/:id', pedidoController.excluirPedido);
}

module.exports = routes;