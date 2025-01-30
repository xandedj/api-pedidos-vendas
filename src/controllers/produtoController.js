const db = require('../config/database');

exports.listarProdutos = async (request, reply) => {
  try {
    const [rows] = await db.query('SELECT * FROM produtos');
    reply.send(rows);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao listar produtos' });
  }
};

exports.obterProduto = async (request, reply) => {
  const { id } = request.params;
  try {
    const [rows] = await db.query('SELECT * FROM produtos WHERE id_produto = ?', [id]);
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Produto não encontrado' });
    } else {
      reply.send(rows[0]);
    }
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter produto' });
  }
};

exports.criarProduto = async (request, reply) => {
  const { nome, preco } = request.body;
  try {
    const [result] = await db.query('INSERT INTO produtos (nome, preco) VALUES (?, ?)', [nome, preco]);
    reply.status(201).send({ id: result.insertId, nome, preco });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao criar produto' });
  }
};

exports.atualizarProduto = async (request, reply) => {
  const { id } = request.params;
  const { nome, preco } = request.body;
  try {
    await db.query('UPDATE produtos SET nome = ?, preco = ? WHERE id_produto = ?', [nome, preco, id]);
    reply.send({ id, nome, preco });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao atualizar produto' });
  }
};

exports.excluirProduto = async (request, reply) => {
  const { id } = request.params;
  try {
    await db.query('DELETE FROM produtos WHERE id_produto = ?', [id]);
    reply.send({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao excluir produto' });
  }
};