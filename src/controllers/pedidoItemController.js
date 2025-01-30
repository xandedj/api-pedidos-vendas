const db = require('../config/database');

exports.listarItensPedido = async (request, reply) => {
  const { idPedido } = request.params;
  try {
    const [rows] = await db.query('SELECT pi.*, p.nome as produto_nome FROM pedido_itens pi JOIN produtos p ON pi.id_produto = p.id_produto WHERE pi.id_pedido = ?', [idPedido]);
    reply.send(rows);
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao listar itens do pedido' });
  }
};

exports.obterItemPedido = async (request, reply) => {
  const { id } = request.params;
  try {
    const [rows] = await db.query('SELECT pi.*, p.nome as produto_nome FROM pedido_itens pi JOIN produtos p ON pi.id_produto = p.id_produto WHERE pi.id_pedido_item = ?', [id]);
    if (rows.length === 0) {
      reply.status(404).send({ error: 'Item de pedido não encontrado' });
    } else {
      reply.send(rows[0]);
    }
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao obter item de pedido' });
  }
};

exports.adicionarItemPedido = async (request, reply) => {
  const { id_pedido, id_produto, qtde, preco } = request.body;
  try {
    const [result] = await db.query('INSERT INTO pedido_itens (id_pedido, id_produto, qtde, preco) VALUES (?, ?, ?, ?)', [id_pedido, id_produto, qtde, preco]);
    reply.status(201).send({ id: result.insertId, id_pedido, id_produto, qtde, preco });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao adicionar item ao pedido' });
  }
};

exports.atualizarItemPedido = async (request, reply) => {
  const { id } = request.params;
  const { qtde, preco } = request.body;
  try {
    await db.query('UPDATE pedido_itens SET qtde = ?, preco = ? WHERE id_pedido_item = ?', [qtde, preco, id]);
    reply.send({ id, qtde, preco });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao atualizar item do pedido' });
  }
};

exports.removerItemPedido = async (request, reply) => {
  const { id } = request.params;
  try {
    await db.query('DELETE FROM pedido_itens WHERE id_pedido_item = ?', [id]);
    reply.send({ message: 'Item do pedido removido com sucesso' });
  } catch (error) {
    reply.status(500).send({ error: 'Erro ao remover item do pedido' });
  }
};