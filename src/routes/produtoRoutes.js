const produtoController = require('../controllers/produtoController');

async function routes(fastify, options) {
  fastify.get('/produtos', produtoController.listarProdutos);
  fastify.get('/produtos/:id', produtoController.obterProduto);
  fastify.post('/produtos', produtoController.criarProduto);
  fastify.put('/produtos/:id', produtoController.atualizarProduto);
  fastify.delete('/produtos/:id', produtoController.excluirProduto);
}

module.exports = routes;