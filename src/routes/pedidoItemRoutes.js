const pedidoItemController = require('../controllers/pedidoItemController');

async function routes(fastify, options) {
  // fastify.get('/pedidos-itens', pedidoItemController.listarItensPedido);
  fastify.get('/pedidos-itens/:id', pedidoItemController.obterItemPedido);
  fastify.post('/pedidos-itens', pedidoItemController.adicionarItemPedido);
  fastify.put('/pedidos-itens/:id', pedidoItemController.atualizarItemPedido);
  fastify.delete('/pedidos-itens/:id', pedidoItemController.removerItemPedido);
}

module.exports = routes;